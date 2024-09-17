import * as vscode from 'vscode';
import { createTemporaryFile } from '../utils/createTemporaryFile';
import { defaultServiceContent, workSpaceStateNames } from '../constants';

export function registerConfigureTextServiceTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextServiceTemplates', async () => {
        var saveDisposable = await createTemporaryFile(workSpaceStateNames.generateService, defaultServiceContent, context);
        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
