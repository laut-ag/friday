# Laut Javascript Error/Logging Framework

## Facade Driven
The preference is to have a facade driven logger which is extensible through compositions.

### Available methods
```
## new LoggerFacade()
#.username(username) -> this
#.userEmail(userEmail) -> this
#.userId(userId) -> this
#.userIp(userIp) -> this
#.tag(key, value) -> this
#.level(level) -> this
#.extra(key, value) -> this
#.getLogger(loggerName) -> exposed logger instance
#.addLogger(loggerName, logger)
#.removeLogger(loggerName)
#.removeAllLoggers()
```
These are the RFC logger levels. They pass the message and any data set on the facade to the underlying loggers. Each logger should I have a mapping of the RFC levels to the appropriate methods/levels exposed by that particular level. If you use one of these methods, any level set by `.level(level)` will/may be overwritten.
```
#.emergency(message)
#.alert(message)
#.critical(message)
#.error(message)
#.warning(message)
#.notice(message)
#.info(message)
#.debug(message)
```
These methods are provided for legecy/extended support on some transports. Each transport should define how to handle these methods. Generally speaking they should set a default level if applicable for the methods and accept the `.level(level)` as an override, however, this may be determined by the individual transport.
```
#.log(message)
#.message(message)
```

## Transports available
1. Sentry
    1. Node
    2. Browser
    3. Vue
2. File
    1. Node only
3. Console
    1. Browser
    2. Node

## Notes on Transports
### Sentry
You need to build the Sentry instance seperately and then pass it into the SentryLogger constructor. You can use the builders provided for each environment to make configuration easier `SentryBrowser`, `SentryNode`, and `SentryVue`. They take care of some sane defaults and expose a more eloquent api than Sentry itself does.

If you send an `Error()` as the message in `#.message()` then sentry will treat it as an exception ... any level you try to pass with be ignored and the level set to `error`. The `#.message()` is only intended to be used with strings in Sentry per their docs.


### File
The file logger accepts a path to the folder where the log should be saved. Default is `__dirname`, which is probably not what you want. Your best bet is to give it an absolute path. Files are named according to the date in the form `yyyy-mm-dd`. **Do not try to give a filename ... it won't work**

The format is a structured JSON object which is stringified of the form
```
{
  date: Date.now(),
  message,
  ...data
}
```
where `...data` is any data passed to the logger by the user

### Console
The console logger outputs `<level> -- <message>` by default. You can pass an optional function to the `ConsoleLogger#constructor` with a formatting you want. The options to the console logger are of the form:
```
{
    formatFn: (level, message, context) => any
} 
```
    
## Examples
### Console
```js
import {ConsoleLogger, LoggerFacade} from 'lautfm-loggers'

const consoleLogger = new ConsoleLogger()
const logger = new LoggerFacade()
logger.addLogger('console', consoleLogger)
logger.info("I'm a message")
```
### File
```js
import {FileLogger, LoggerFacade} from 'lautfm-loggers'

const fileLogger = new FileLogger({ filepath: '.' })
const logger = new LoggerFacade()
logger.addLogger('file', fileLogger)
logger.info( "I'm a message" )
```
### Sentry
```js
import {SentryBrowser, SentryLogger, LoggerFacade} from 'lautfm-loggers'

const sentryBuilder = new SentryBrowser()
const Sentry = sentryBuilder
    .dsn('https://mydsn.com')
    .env('production')
    .release('beta3')
    .make()
const sentryLogger = new SentryLogger(Sentry)

const logger = new LoggerFacade()
logger.addLogger('sentry', sentryLogger)
logger.info("I'm a message")
```
### Multiple Loggers
```js
import {SentryNode, SentryLogger, FileLogger, LoggerFacade} from 'lautfm-loggers'

const sentryBuilder = new SentryBrowser()
const Sentry = sentryBuilder
    .dsn('https://mydsn.com')
    .env('production')
    .release('beta3')
    .make()
const sentryLogger = new SentryLogger(Sentry)

const fileLogger = new FileLogger({ filepath: '.' })

const logger = new LoggerFacade
logger.addLogger('file', fileLogger)
logger.addLogger('sentry', sentryLogger)

logger.info("I'm Logging to both instances")

logger.removeLogger('sentry')

logger.info("I'm just logging to a file now")
```
