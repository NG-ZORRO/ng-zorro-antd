/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

const prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

loadLanguages(['bash', 'diff', 'markup-templating', 'json', 'less', 'typescript']);

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
          {
            pattern: /^\$\(\(/,
            function: prism.languages.bash['function'],
            keyword: prism.languages.bash.keyword,
            boolean: prism.languages.bash.boolean,
            operator: prism.languages.bash.operator,
            punctuation: prism.languages.bash.punctuation
          }
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
    /\$(?:[a-z0-9_#?*!@]+|\{[^}]+\})/i
  ]
};

prism.languages.bash = {
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
    pattern:
      /(^|\s|;|\||&)(?:alias|ng-zorro-antd|@angular\/cli|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|ng|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
    lookbehind: true
  },
  keyword: {
    pattern:
      /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
    lookbehind: true
  },
  boolean: {
    pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
    lookbehind: true
  },
  operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
  punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
};

/**
 * Extend Angular
 */
prism.languages.angular = prism.languages.extend('typescript', {});

prism.languages.insertBefore('angular', 'string', {
  'template-string': {
    pattern: /template[\s]*:[\s]*`(?:\\[\s\S]|[^\\`])*`/,
    greedy: true,
    inside: {
      html: {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        inside: prism.languages.html
      }
    }
  },
  'styles-string': {
    pattern: /styles[\s]*:[\s]*\[[\s]*`(?:\\[\s\S]|[^\\`])*`[\s]*\]/,
    greedy: true,
    inside: {
      css: {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        inside: prism.languages.css
      }
    }
  }
});

export default prism;
