import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerGenerateModelsCommand(context: vscode.ExtensionContext) {
    let generateModelDisposable = vscode.commands.registerCommand('extension.generateModels', async (uri: vscode.Uri) => {
        // Recuperar o conteúdo do modelo salvo ou usar um conteúdo padrão
        const savedModelContent = context.workspaceState.get<string>('codeFileContent');
        const defaultModelContent = `namespace YourNamespace
        {
            public class YourClass
            {
            }
        }`;

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
            `Create${entityName}Model.cs`,
            `Update${entityName}Model.cs`,
            `${entityName}Model.cs`,
        ];

        for (const fileName of filesToCreate) {
            const className = fileName.replace('.cs', '');
            const content = modelContent.replace(/YourClass/g, className);

            const filePath = path.join(entityFolderPath, fileName);

            try {
                await fs.promises.writeFile(filePath, content, { encoding: 'utf8' });
                vscode.window.showInformationMessage(`Arquivo ${fileName} criado com sucesso.`);
                
                // Abrir o arquivo após a escrita
                const document = await vscode.workspace.openTextDocument(filePath);
                await vscode.window.showTextDocument(document);
            } catch (error) {
                const err = error as Error;
                vscode.window.showErrorMessage(`Erro ao criar o arquivo ${fileName}: ${err.message}`);
            }
        }

        vscode.window.showInformationMessage(`CRUD para ${entityName} gerado na pasta ${entityFolderPath}`);
    });

    context.subscriptions.push(generateModelDisposable);
}
