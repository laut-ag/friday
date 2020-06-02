#!/usr/bin/env sh

BUILD_TYPE=$1

case "$BUILD_TYPE" in
'browser')
  OUT="browser/"
  ;;
'module')
  OUT="es/"
  ;;
'cjs')
  OUT="cjs/"
  ;;
*)
  echo 'Must suply module/cjs/browser as build type'
  ;;
esac

babel --delete-dir-on-start --env-name "$BUILD_TYPE" -d "$OUT" src --extensions='.ts,.js' --ignore 'src/VuePlugin/Friday.js'

if [ "$BUILD_TYPE" == 'browser' ]; then
  mkdir browser/VuePlugin
  cp src/VuePlugin/Friday.js browser/VuePlugin/Friday.js
fi

exit 0
