import * as vscode from 'vscode';
import { createPersistentFile } from '../utils/createPersistentFile';
import { defaultModelContent, workSpaceStateNames } from '../constants';

export function registerConfigureTextControllerTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextControllerTemplates', async () => {
        var saveDisposable = await createPersistentFile(workSpaceStateNames.generateController, defaultModelContent, context);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
