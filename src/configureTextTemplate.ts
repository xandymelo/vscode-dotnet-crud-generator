import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerConfigureTextTemplatesCommand(context: vscode.ExtensionContext) {

    let configureShortcutsDisposable = vscode.commands.registerCommand('extension.configureTextModelsTemplates', async () => {
        // Conteúdo C# inicial (pode ser carregado de algum lugar ou fornecido um default)
        const generateModelContent = `namespace YourNamespace
        {
            public class YourClass
            {
                public string Property { get; set; }
                
                // Add your properties and methods here
            }
        }`;
        // Criar um arquivo temporário na pasta de configuração do workspace
        const tempFilePath = path.join(context.extensionPath, 'generateModel.cs');
        fs.writeFileSync(tempFilePath, generateModelContent, { encoding: 'utf8' });

        // Abrir o arquivo temporário no editor
        const documentUri = vscode.Uri.file(tempFilePath);
        const document = await vscode.workspace.openTextDocument(documentUri);
        await vscode.window.showTextDocument(document);

        // Registrar o evento de salvar o documento
        const saveDisposable = vscode.workspace.onDidSaveTextDocument((doc) => {
            if (doc.uri.fsPath === tempFilePath) {
                // Capturar o conteúdo do documento e atualizar no workspaceState ou outro local
                const newContent = doc.getText();
                context.workspaceState.update('codeFileContent', newContent);
                vscode.window.showInformationMessage('Código C# salvo com sucesso!');
            }
        });

        // Limpeza: Excluir o arquivo temporário quando a extensão for desativada
        context.subscriptions.push({
            dispose() {
                if (fs.existsSync(tempFilePath)) {
                    fs.unlinkSync(tempFilePath);
                }
            }
        });

        context.subscriptions.push(configureShortcutsDisposable, saveDisposable);
    });

}
