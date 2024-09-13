import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
//todo separar os disposable em arquivos tipo, generateModel.ts,
//criar uma pasta com arquivo utils.ts para funções utilitárias, como perguntar nome do entity
export function activate(context: vscode.ExtensionContext) {
	let generateModelDisposable = vscode.commands.registerCommand('extension.generateModels', async (uri: vscode.Uri) => {
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
            fs.mkdirSync(entityFolderPath);
        }
        const filesToCreate = [
            `Create${entityName}Model.cs`,
            `Update${entityName}Model.cs`,
            `${entityName}Model.cs`,
        ];
        filesToCreate.forEach(fileName => {
            const className = fileName.replace('.cs', '');
            const content = `namespace YourNamespace\n{\n    public class ${className}\n    {\n        // Add your properties here\n    }\n}`;
            const filePath = path.join(entityFolderPath, fileName);
            fs.writeFileSync(filePath, content, { encoding: 'utf8' });
        });
        vscode.window.showInformationMessage(`CRUD para ${entityName} gerado na pasta ${entityFolderPath}`);
    });
	context.subscriptions.push(generateModelDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
