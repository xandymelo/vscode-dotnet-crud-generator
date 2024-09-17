import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export async function createFiles(filesToCreate: string[], currentPath: string, modelContent: string) {
    for (const fileName of filesToCreate) {
        const className = fileName.replace('.cs', '');
        const content = modelContent.replace(/YourClass/g, className);

        const filePath = path.join(currentPath, fileName);

        try {
            await fs.promises.writeFile(filePath, content, { encoding: 'utf8' });
            vscode.window.showInformationMessage(`Arquivo ${fileName} criado com sucesso.`);
            const document = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(document);
        } catch (error) {
            const err = error as Error;
            vscode.window.showErrorMessage(`Erro ao criar o arquivo ${fileName}: ${err.message}`);
        }
    }
}