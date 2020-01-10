ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TARGET="$ROOT/integration/$1"

mkdir -p "$TARGET/ng-zorro-antd"
rsync -av --exclude=".*" "$ROOT/publish/" "$TARGET/ng-zorro-antd" > /dev/null 2>&1

for lib in "@angular/animations" "@angular/cdk" "@angular/common" "@angular/compiler" "@angular/core" "@angular/forms" "@angular/platform-browser" "@angular/platform-browser-dynamic" "@angular/router" "@angular/cli" "@angular/compiler-cli" "rxjs" "typescript" "zone.js" "date-fns" "core-js"
do
  mkdir -p "$TARGET/$lib"
  rsync -av --exclude=".*" "$ROOT/node_modules/$lib/" "$TARGET/$lib" > /dev/null 2>&1
  rm -rf "$TARGET/$lib/node_modules"
done
