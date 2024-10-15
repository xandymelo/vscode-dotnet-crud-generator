import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { globalFileNames } from './constants';

export function registerResetDefaultSettings(context: vscode.ExtensionContext) {
  let resetDefaultSettingsCommand = vscode.commands.registerCommand('extension.resetDefaultSettings', () => {
    const userConfigPathModels = path.join(vscode.env.appRoot, '..', '..', 'User', globalFileNames.generateModels + '.cs');
    const userConfigPathService = path.join(vscode.env.appRoot, '..', '..', 'User', globalFileNames.generateService + '.cs');
    const userConfigPathController = path.join(vscode.env.appRoot, '..', '..', 'User', globalFileNames.generateController + '.cs');
    function deleteFileIfExists(filePath: string) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    deleteFileIfExists(userConfigPathModels);
    deleteFileIfExists(userConfigPathService);
    deleteFileIfExists(userConfigPathController);
    vscode.window.showInformationMessage('Default settings have been reset. Files have been deleted.');
  });
  context.subscriptions.push(resetDefaultSettingsCommand);
}
