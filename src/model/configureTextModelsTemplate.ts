import * as vscode from 'vscode';
import { defaultModelContent, workSpaceStateNames } from '../constants';
import { createPersistentFile } from '../utils/createPersistentFile';

export function registerConfigureTextModelsTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextModelsTemplates', async () => {
        var saveDisposable = await createPersistentFile(workSpaceStateNames.generateModels, defaultModelContent, context);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
