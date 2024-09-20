import * as vscode from 'vscode';
import { createFiles } from '../utils/createLocalFile';
import { CreateFile, defaultModelContent, workSpaceStateNames } from '../constants';

export function registerGenerateControllerCommand(context: vscode.ExtensionContext) {
    let generateDisposable = vscode.commands.registerCommand('extension.generateController', async (uri: vscode.Uri) => {
        const savedContent = context.workspaceState.get<string>(workSpaceStateNames.generateController);
        const modelContent = savedContent || defaultModelContent;
        var entityName = await vscode.window.showInputBox({
            prompt: 'Enter the name of the entity to generate the models',
            placeHolder: 'Example: Product'
        });
        if (!entityName) {
            vscode.window.showErrorMessage('No name was given!');
            return;
        }
        entityName = entityName[0].toUpperCase() + entityName.slice(1);
        const folderPath = uri.fsPath;

        const filesToCreate: CreateFile[] = [
            {
                name: entityName,
                type: workSpaceStateNames.generateController
            }
        ];
        await createFiles(filesToCreate, folderPath, modelContent);
        vscode.window.showInformationMessage(`${entityName} Controller created in ${folderPath}`);
    });

    context.subscriptions.push(generateDisposable);
}
