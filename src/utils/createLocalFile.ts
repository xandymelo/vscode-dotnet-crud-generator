import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { CreateFile, workSpaceStateNames } from '../constants';

export async function createFiles(filesToCreate: CreateFile[], currentPath: string, modelContent: string) {
    for (const file of filesToCreate) {
        const fileName = file.type === workSpaceStateNames.generateModels ? file.name + "Model.cs" : 
            file.type === workSpaceStateNames.generateController ? file.name + "Controller.cs" :
            file.name + "Service.cs"; 
        const content = modelContent.replace(/\[YourClass\]/g, file.name).replace(/\[YourClassLower\]/g, file.name.toLowerCase()).replace(/\[YourClassUpper\]/g, file.name.toUpperCase());
        const filePath = path.join(currentPath, fileName);
        try {
            await fs.promises.writeFile(filePath, content, { encoding: 'utf8' });
            vscode.window.showInformationMessage(`File ${file.name} crreated successfully.`);
            const document = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(document);
        } catch (error) {
            const err = error as Error;
            vscode.window.showErrorMessage(`Error creating file ${file}: ${err.message}`);
        }
    }
}