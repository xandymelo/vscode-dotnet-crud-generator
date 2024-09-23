import * as vscode from 'vscode';
import { defaultServiceContent, workSpaceStateNames } from '../constants';
import { createPersistentFile } from '../utils/createPersistentFile';

export function registerConfigureTextServiceTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextServiceTemplates', async () => {
        var saveDisposable = await createPersistentFile(workSpaceStateNames.generateService, defaultServiceContent);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
