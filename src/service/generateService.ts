import * as vscode from 'vscode';
import { createFiles } from '../utils/createLocalFile';
import { CreateFile, defaultServiceContent, workSpaceStateNames } from '../constants';
export function registerGenerateServiceCommand(context: vscode.ExtensionContext) {
    let generateServiceDisposable = vscode.commands.registerCommand('extension.generateService', async (uri: vscode.Uri) => {
        const savedModelContent = context.workspaceState.get<string>(workSpaceStateNames.generateService);
       
        const modelContent = savedModelContent || defaultServiceContent;
        var entityName = await vscode.window.showInputBox({
            prompt: 'Enter the name of the entity to generate',
            placeHolder: 'Example: Product'
        });
        if (!entityName) {
            vscode.window.showErrorMessage('No name was given!');
            return;
        }
        entityName = entityName[0].toUpperCase() + entityName.slice(1);
        const path = uri.fsPath;
        const filesToCreate : CreateFile[] = [
            {
                name: `${entityName}`,
                type: workSpaceStateNames.generateService
            }
        ];
        await createFiles(filesToCreate, path, modelContent);
        vscode.window.showInformationMessage(`${entityName} Service create in ${path}`);
    });
    context.subscriptions.push(generateServiceDisposable);
}
