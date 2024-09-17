import * as vscode from 'vscode';
import { createTemporaryFile } from '../utils/createTemporaryFile';
import { defaultModelContent, workSpaceStateNames } from '../constants';

export function registerConfigureTextModelsTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextModelsTemplates', async () => {
        var saveDisposable = await createTemporaryFile(workSpaceStateNames.generateModels, defaultModelContent, context);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
