import { injectable } from 'inversify'
import { LoggerInterface } from '../xoi/interfaces'
export type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'log'

@injectable()
export default class Logger implements LoggerInterface {
  // Instance property for the console instance
  private _console: Console

  constructor() {
    // Use the default console unless a custom one is provided
    this._console = console
  }

  // Method to set a custom console
  setConsole(customConsole: Console): void {
    this._console = customConsole
  }

  // General log method for all levels
  private log(
    level: LogLevel,
    action: string,
    message: string,
    details?: Record<string, unknown>
  ): void {
    const timestamp = new Date().toISOString()
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] [${action}] ${message}`

    switch (level) {
      case 'info':
        this._console.info(formattedMessage, details || '')
        break
      case 'warn':
        this._console.warn(formattedMessage, details || '')
        break
      case 'error':
        this._console.error(formattedMessage, details || '')
        break
      case 'debug':
        this._console.debug(formattedMessage, details || '')
        break
      default:
        this._console.log(formattedMessage, details || '')
    }
  }

  // Level-specific methods
  public info(message: string, details?: Record<string, unknown>): void {
    this.log('info', 'INFO', message, details)
  }

  public warn(message: string, details?: Record<string, unknown>): void {
    this.log('warn', 'DEPRECATION_WARNING', message, details)
  }

  public error(message: string, details?: Record<string, unknown> | Error): void {
    let errorDetails: Record<string, unknown> = {}

    if (details instanceof Error) {
      // If details is an Error object, extract message and stack
      errorDetails = {
        message: details.message,
        stack: details.stack,
      }
    } else if (details) {
      // Otherwise, treat details as a Record<string, unknown>
      errorDetails = details
    }

    this.log('error', 'ERROR', message, errorDetails)
  }

  public debug(message: string, details?: Record<string, unknown>): void {
    this.log('debug', 'DEBUG_TRACE', message, details)
  }

  public logMessage(message: string, details?: Record<string, unknown>): void {
    this.log('log', 'GENERAL', message, details)
  }
}
