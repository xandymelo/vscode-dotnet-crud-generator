import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createFiles } from '../utils/createFile';
import { defaultModelContent, workSpaceStateNames } from '../constants';

export function registerGenerateModelsCommand(context: vscode.ExtensionContext) {
    let generateModelDisposable = vscode.commands.registerCommand('extension.generateModels', async (uri: vscode.Uri) => {
        const savedModelContent = context.workspaceState.get<string>(workSpaceStateNames.generateModels);
        const modelContent = savedModelContent || defaultModelContent;
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
        const entityFolderPath = path.join(folderPath, entityName);

        if (!fs.existsSync(entityFolderPath)) {
            fs.mkdirSync(entityFolderPath, { recursive: true });
            vscode.window.showInformationMessage(`Pasta ${entityFolderPath} criada.`);
        }

        const filesToCreate = [
            `Create${entityName}Model`,
            `Update${entityName}Model`,
            `${entityName}Model`,
        ];
        await createFiles(filesToCreate, entityFolderPath, modelContent);
        

        vscode.window.showInformationMessage(`Models para ${entityName} gerado na pasta ${entityFolderPath}`);
    });

    context.subscriptions.push(generateModelDisposable);
}
