const marked = require('marked');
const { parseFragment, serialize } = require('parse5');

const renderer = new marked.Renderer();
const Prism = require('node-prismjs');

const insideString = {
  variable: [
    // Arithmetic Environment
    {
      pattern: /\$?\(\([\w\W]+?\)\)/,
      inside: {
        // If there is a $ sign at the beginning highlight $(( and )) as variable
        variable: [
          {
            pattern: /(^\$\(\([\w\W]+)\)\)/,
            lookbehind: true
          },
          /^\$\(\(/
        ],
        number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
        // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
        operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
        // If there is no $ sign at the beginning highlight (( and )) as punctuation
        punctuation: /\(\(?|\)\)?|,|;/
      }
    },
    // Command Substitution
    {
      pattern: /\$\([^)]+\)|`[^`]+`/,
      inside: {
        variable: /^\$\(|^`|\)$|`$/
      }
    },
    /\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i
  ]
};

Prism.languages.bash = {
  shebang: {
    pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
    alias: 'important'
  },
  comment: {
    pattern: /(^|[^"{\\])#.*/,
    lookbehind: true
  },
  string: [
    //Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
    {
      pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
      lookbehind: true,
      greedy: true,
      inside: insideString
    },
    {
      pattern: /(["'])(?:\\\\|\\?[^\\])*?\1/g,
      greedy: true,
      inside: insideString
    }
  ],
  variable: insideString.variable,
  // Originally based on http://ss64.com/bash/
  function: {
    pattern: /(^|\s|;|\||&)(?:alias|ng-zorro-antd|@angular\/cli|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|ng|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
    lookbehind: true
  },
  keyword: {
    pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
    lookbehind: true
  },
  boolean: {
    pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
    lookbehind: true
  },
  operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
  punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
};

const inside = insideString.variable[1].inside;
inside['function'] = Prism.languages.bash['function'];
inside.keyword = Prism.languages.bash.keyword;
inside.boolean = Prism.languages.bash.boolean;
inside.operator = Prism.languages.bash.operator;
inside.punctuation = Prism.languages.bash.punctuation;

const oldLinkHandler = renderer.link;
renderer.link = function (href, title, text) {
  const str = oldLinkHandler.call(this, href, title, text);
  const a = parseFragment(str, {});
  /**
   *
   */
  if (a && a.childNodes[0] && a.childNodes[0].nodeName === 'a') {
    if (!/^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/.test(href)) {
      // Open absolute path in new window
      a.childNodes[0].attrs.push({
        name: 'target',
        value: '_blank'
      });
      a.childNodes[0].attrs.push({
        name: 'rel',
        value: 'noopener'
      });
    }
    return serialize(a);
  }

  return str;
};

/**
 * @param {'component' | 'directive' | 'standalone' | 'service'} label
 * @returns {string}
 */
function createLabel(label) {
  return `<label class="api-type-label ${label}">${label}</label>`;
}

const DIRECTIVE_REGEX = /^\[[a-zA-Z-]+\]/;
const STANDALONE_SUFFIX_REGEX = /:standalone$/;

/**
 * Clean up special tags such as suffixes.
 *
 * Currently we have the following tags:
 *
 * Suffix:
 * - `:standalone`: Indicates that the target is a standalone component, directive or pipe.
 *
 * @param {string} text
 */
function normalizeHead(text) {
  return text.replace(STANDALONE_SUFFIX_REGEX, '');
}

/**
 * @param {string} text
 * @param {number} level
 * @returns {string}
 */
renderer.heading = function (text, level) {
  const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g, '');
  const isMarkedLabel = level === 3 && text.indexOf('nz-') === 0;
  const isDirective = DIRECTIVE_REGEX.test(text);
  const isComponent = isMarkedLabel && !isDirective;
  const isStandalone = STANDALONE_SUFFIX_REGEX.test(text);
  const isService = text.indexOf('Nz') === 0 && text.indexOf('Service') > -1;
  const head = `<h${level} id="${lowerText}"><span>${normalizeHead(text)}</span>`;
  const link = `<a onclick="window.location.hash = '${lowerText}'" class="anchor">#</a></h${level}>`;

  let heading = head;

  if (isComponent) {
    heading += createLabel('component');
  } else if (isDirective) {
    heading += createLabel('directive');
  } else if (isService) {
    heading += createLabel('service');
  }

  if (isStandalone) {
    heading += createLabel('standalone');
  }

  heading += link;

  return heading;
};

renderer.code = function (code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0];
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>' + (escaped ? code : escape(code, true)) + '</code></pre>';
  }

  return (
    '<pre class="' +
    this.options.langPrefix +
    escape(lang, true) +
    '">' +
    '<code>' +
    (escaped ? code : escape(code, true)) +
    '</code></pre>\n'
  );
};

marked.setOptions({
  highlight: function (code, lang) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(code, language);
  },
  renderer: renderer
});

module.exports = marked;
