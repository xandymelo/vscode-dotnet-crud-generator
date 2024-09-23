import * as vscode from 'vscode';
import { createFiles } from '../utils/createLocalFile';
import { CreateFile, defaultServiceContent, globalFileNames } from '../constants';
import { getContent } from '../utils/getContent';

export function registerGenerateServiceCommand(context: vscode.ExtensionContext) {
    let generateServiceDisposable = vscode.commands.registerCommand('extension.generateService', async (uri: vscode.Uri) => {
        let content = getContent(globalFileNames.generateService, defaultServiceContent);
        var entityName = await vscode.window.showInputBox({
            prompt: 'Enter the name of the entity to generate',
            placeHolder: 'Example: Product'
        });
        if (!entityName) {
            vscode.window.showErrorMessage('No name was given!');
            return;
        }
        entityName = entityName[0].toUpperCase() + entityName.slice(1);
        const createPath = uri.fsPath;
        const filesToCreate : CreateFile[] = [
            {
                name: `${entityName}`,
                type: globalFileNames.generateService
            }
        ];
        await createFiles(filesToCreate, createPath, content);
        vscode.window.showInformationMessage(`${entityName} Service create in ${createPath}`);
    });
    context.subscriptions.push(generateServiceDisposable);
}
