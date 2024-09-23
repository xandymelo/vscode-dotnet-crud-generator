import * as vscode from 'vscode';
import { createPersistentFile } from '../utils/createPersistentFile';
import { defaultModelContent, globalFileNames } from '../constants';

export function registerConfigureTextControllerTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextControllerTemplates', async () => {
        var saveDisposable = await createPersistentFile(globalFileNames.generateController, defaultModelContent);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
