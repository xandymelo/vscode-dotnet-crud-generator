import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function createPersistentFile(fileName: string, content: string, context: vscode.ExtensionContext) {
    const userConfigPath = path.join(vscode.env.appRoot, '..', '..', 'User', fileName + '.cs');

    // Verifica se a pasta existe, se não existir, cria a pasta
    const userConfigDir = path.dirname(userConfigPath);
    if (!fs.existsSync(userConfigDir)) {
        fs.mkdirSync(userConfigDir, { recursive: true });
    }

    // Cria o arquivo com o conteúdo fornecido
    fs.writeFileSync(userConfigPath, content, { encoding: 'utf8' });

    // Abre o documento no VSCode
    const documentUri = vscode.Uri.file(userConfigPath);
    const document = await vscode.workspace.openTextDocument(documentUri);
    await vscode.window.showTextDocument(document);

    // Adiciona lógica de limpeza para remover o arquivo após ser fechado
    context.subscriptions.push({
        dispose() {
            if (fs.existsSync(userConfigPath)) {
                fs.unlinkSync(userConfigPath);
            }
        }
    });

    // Monitora o salvamento do arquivo para salvar o conteúdo no estado da workspace
    return vscode.workspace.onDidSaveTextDocument((doc) => {
        if (doc.uri.fsPath === userConfigPath) {
            const newContent = doc.getText();
            context.workspaceState.update(fileName, newContent);
            vscode.window.showInformationMessage('Código C# salvo com sucesso!');
        }
    });
}