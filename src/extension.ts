'use strict'

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let tanakh = new Tanakh()
  let controller = new TanakhController(tanakh)
  let updateTanakh = vscode.commands.registerCommand('extension.updateTanakh', () => {
    tanakh.update()
  })
  let updateTanakhPattern = vscode.commands.registerCommand('extension.updateTanakhPattern', () => {
    tanakh.updatePattern()
  })
  context.subscriptions.push(controller, tanakh, updateTanakh, updateTanakhPattern)
}

export function deactivate() {
}

class Tanakh {
  public constructor() {
    this.status.command = 'extension.updateTanakhPattern'
    this.status.tooltip = 'たなこふ'
    let configuration = vscode.workspace.getConfiguration('tanakh')
    configuration.has('defaultPattern') && (this.pattern = configuration.get('defaultPattern'))
  }

  public update() {
    this.counter++
    this.status.text = this.faces[this.pattern][this.counter %= this.faces[this.pattern].length]
    this.status.show()
  }

  public updatePattern() {
    this.pattern++
    this.status.text = this.faces[this.pattern %= this.faces.length][this.counter = 0]
    this.status.show()
  }

  public dispose() {
    this.status.dispose()
  }

  private status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)

  private pattern = 0

  private counter = -1

  private faces = [
    [
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
    ],
    [
      '( ´･_･`)∩ $(keyboard)',
      '( ´･_･`)つ $(keyboard)'
    ],
    [
      '(´･_･`)   $(telescope)',
      '(´･_･`)  $(telescope)',
      '(´･_･`) $(telescope)',
      '(´･_･`)$(telescope)',
      '(´･_･`$(telescope)',
      '(´･_･$(telescope)',
      '(´･_$(telescope)',
      '(´･_･`$(bug)',
      '(´･_･`)$(bug)',
      '(´･_･`)  $(bug)'
    ],
    [
      '        $(gift)   ',
      ')       $(gift)   ',
      '`)      $(gift)   ',
      '･`)     $(gift)   ',
      '_･`)    $(gift)   ',
      '･_･`)   $(gift)   ',
      '´･_･`)  $(gift)   ',
      '(´･_･`) $(gift)   ',
      ' (´･_･`)$(gift)   ',
      '  (´･_･`)$(gift)  ',
      '   (´･_･`)$(gift) ',
      '    (´･_･`)$(gift)',
      '     (´･_･`)   ',
      '      (´･_･`)  ',
      '       (´･_･`) ',
      '        (´･_･`)',
      '         (´･_･`',
      '          (´･_･',
      '           (´･_',
      '            (´･',
      '             (´',
      '              (',
      '               '
    ],
    [
      '$(watch)(´･_･`)$(bug)$(bug)$(bug)$(bug)',
      '$(watch)(´･_･`) $(zap) $(bug)$(bug)$(bug)',
      '$(watch)(´･_･`)$(flame)$(bug)$(bug)$(bug)',
      '   $(watch)(´･_･`)$(bug)$(bug)$(bug)',
      '   $(watch)(´･_･`) $(zap) $(bug)$(bug)',
      '   $(watch)(´･_･`)$(flame)$(bug)$(bug)',
      '      $(watch)(´･_･`)$(bug)$(bug)',
      '      $(watch)(´･_･`) $(zap) $(bug)',
      '      $(watch)(´･_･`)$(flame)$(bug)',
      '         $(watch)(´･_･`)$(bug)',
      '         $(watch)(´･_･`) $(zap) ',
      '         $(watch)(´･_･`)$(flame)',
      '            $(watch)(´･_･`)',
      '             $(watch)(´･_･`',
      '              $(watch)(´･_･',
      '               $(watch)(´･_',
      '                $(watch)(´･',
      '                 $(watch)(´',
      '                  $(watch)(',
      '                   $(watch)',
      '                      ',
      '                   $(bug)',
      '                $(bug)   ',
      '                $(bug)$(bug)',
      '             $(bug)      ',
      '             $(bug)   $(bug)',
      ')            $(bug)$(bug)   ',
      '`)           $(bug)$(bug)$(bug)',
      '･`)       $(bug)         ',
      '_･`)      $(bug)      $(bug)',
      '･_･`)     $(bug)   $(bug)   ',
      '´･_･`)    $(bug)   $(bug)$(bug)',
      '(´･_･`)   $(bug)$(bug)      ',
      ' (´･_･`)  $(bug)$(bug)   $(bug)',
      '  (´･_･`) $(bug)$(bug)$(bug)   '
    ]
  ]
}

class TanakhController {
  private tanakh: Tanakh
  private disposable: vscode.Disposable

  public constructor(tanakh: Tanakh) {
    this.tanakh = tanakh
    let subscriptions: vscode.Disposable[] = []
    vscode.window.onDidChangeTextEditorSelection(this.update, this, subscriptions)
    this.tanakh.update()
    this.disposable = vscode.Disposable.from(...subscriptions)
  }

  public update() {
    this.tanakh.update()
  }

  public dispose() {
    this.disposable.dispose()
  }
}
