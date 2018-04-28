'use strict'

import * as vscode from 'vscode'
import { Tanakh } from './Tanakh'
import { TanakhController } from './TanakhController'

export function activate(context: vscode.ExtensionContext) {
  const tanakh = new Tanakh()
  const controller = new TanakhController(tanakh)
  const updateTanakh = vscode.commands.registerCommand('extension.updateTanakh', () => tanakh.update())
  const updateTanakhPattern = vscode.commands.registerCommand('extension.updateTanakhPattern', () => tanakh.updatePattern())
  context.subscriptions.push(controller, tanakh, updateTanakh, updateTanakhPattern)
}

export function deactivate() {
  // nothing to do
}
