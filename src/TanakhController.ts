'use strict'

import * as vscode from 'vscode'
import { Tanakh } from './Tanakh'

export class TanakhController {
  private tanakh: Tanakh
  private disposable: vscode.Disposable

  public constructor(tanakh: Tanakh) {
    this.tanakh = tanakh
    const subscriptions: vscode.Disposable[] = []
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
