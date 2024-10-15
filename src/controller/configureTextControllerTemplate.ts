import * as vscode from 'vscode';
import { createPersistentFile } from '../utils/createPersistentFile';
import { defaultControllerContent, globalFileNames } from '../constants';

export function registerConfigureTextControllerTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextControllerTemplates', async () => {
        var saveDisposable = await createPersistentFile(globalFileNames.generateController, defaultControllerContent);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
