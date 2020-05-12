module.exports = api => {
  if ( api.env( 'testing' ) ) api.cache( false )
  let presets = [
    [ '@babel/preset-env', { targets: { node: "current" } } ],
    '@babel/preset-typescript'
  ]

  if ( api.env( 'cjs' ) ) {
    presets[ 0 ][ 1 ].targets.node = "10"
  }

  if ( api.env( 'module' ) ) {
    presets[ 0 ][ 1 ].targets.node = "10"
    presets[ 0 ][ 1 ].modules = false
  }

  if ( api.env( 'browser' ) ) {
    delete presets[ 0 ][ 1 ].targets.node
    presets[ 0 ][ 1 ].targets.browsers = "last 2 versions, > 5%, ie 11, Firefox ESR, not dead"
    presets[ 0 ][ 1 ].modules = false
  }

  return { presets }
}
