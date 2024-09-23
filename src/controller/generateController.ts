import * as vscode from 'vscode';
import { createFiles } from '../utils/createLocalFile';
import { CreateFile, defaultControllerContent, globalFileNames } from '../constants';
import { getContent } from '../utils/getContent';

export function registerGenerateControllerCommand(context: vscode.ExtensionContext) {
    let generateDisposable = vscode.commands.registerCommand('extension.generateController', async (uri: vscode.Uri) => {
        let content = getContent(globalFileNames.generateController, defaultControllerContent);
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
                type: globalFileNames.generateController
            }
        ];
        await createFiles(filesToCreate, folderPath, content);
        vscode.window.showInformationMessage(`${entityName} Controller created in ${folderPath}`);
    });
    context.subscriptions.push(generateDisposable);
}
