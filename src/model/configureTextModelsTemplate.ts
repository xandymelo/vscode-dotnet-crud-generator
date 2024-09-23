import * as vscode from 'vscode';
import { defaultModelContent, globalFileNames } from '../constants';
import { createPersistentFile } from '../utils/createPersistentFile';

export function registerConfigureTextModelsTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextModelsTemplates', async () => {
        var saveDisposable = await createPersistentFile(globalFileNames.generateModels, defaultModelContent);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
