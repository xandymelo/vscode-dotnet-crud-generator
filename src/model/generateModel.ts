import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createFiles } from '../utils/createLocalFile';
import { CreateFile, defaultModelContent, defaultServiceContent, globalFileNames } from '../constants';
import { getContent } from '../utils/getContent';

export function registerGenerateModelsCommand(context: vscode.ExtensionContext) {
    let generateModelDisposable = vscode.commands.registerCommand('extension.generateModels', async (uri: vscode.Uri) => {
        let content = getContent(globalFileNames.generateModels, defaultModelContent);
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

        const filesToCreate: CreateFile[] = [
            {
                name: `Create${entityName}`,
                type: globalFileNames.generateModels,
            },
            {
                name:`Update${entityName}`,
                type: globalFileNames.generateModels
            },
            {
                name: entityName,
                type: globalFileNames.generateModels
            }
        ];
        await createFiles(filesToCreate, entityFolderPath, content);
        

        vscode.window.showInformationMessage(`${entityName} Models created in ${entityFolderPath}`);
    });

    context.subscriptions.push(generateModelDisposable);
}
