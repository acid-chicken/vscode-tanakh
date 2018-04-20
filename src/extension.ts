'use strict'

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let tanakh = new Tanakh()
  let controller = new TanakhController(tanakh)
  let disposable = vscode.commands.registerCommand('extension.updateTanakh', () => {
    tanakh.update()
  })
  context.subscriptions.push(controller)
  context.subscriptions.push(tanakh)
  context.subscriptions.push(disposable)
}

export function deactivate() {
}

class Tanakh {
  public constructor() {
    this.status.command = 'extension.updateTanakh'
    this.status.tooltip = 'たなこふ'
  }

  public update() {
    this.counter++
    this.status.text = this.faces[this.counter %= this.faces.length]
    this.status.show()
  }

  public dispose() {
    this.status.dispose()
  }

  private status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)

  private counter = 0

  private faces = [
    '  (´･_･`)´･_･`)  ',
    '   (´･_･`)_･`)   ',
    '    (´･_･`)`)    ',
    '    ((´･_･`)     ',
    '   (´･(´･_･`)    ',
    '   (´･_(´･_･`)   ',
    '  (´･_･`)´･_･`)  ',
    '   (´･_･`)_･`)   ',
    '    (´･_･`)`)    ',
    '    (´･_･`))     ',
    '     ((´･_･`)    ',
    '    (´･(´･_･`)   ',
    '   (´･_(´･_･`)   '
  ]
}

class TanakhController {
  private tanakh: Tanakh
  private disposable: vscode.Disposable

  public constructor(tanakh: Tanakh) {
    this.tanakh = tanakh
    let subscriptions: vscode.Disposable[] = []
    vscode.window.onDidChangeTextEditorSelection(this.tanakh.update, this, subscriptions)
    this.tanakh.update()
    this.disposable = vscode.Disposable.from(...subscriptions)
  }

  public dispose() {
    this.disposable.dispose()
  }
}
