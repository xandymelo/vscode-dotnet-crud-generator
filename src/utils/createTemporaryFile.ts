import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function createTemporaryFile(fileName: string, content: string, context: vscode.ExtensionContext) {
    const tempFilePath = path.join(context.extensionPath, fileName +'.cs');
    fs.writeFileSync(tempFilePath, content, { encoding: 'utf8' });
    const documentUri = vscode.Uri.file(tempFilePath);
    const document = await vscode.workspace.openTextDocument(documentUri);
    await vscode.window.showTextDocument(document);
    context.subscriptions.push({
        dispose() {
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
        }
    });
    return vscode.workspace.onDidSaveTextDocument((doc) => {
        if (doc.uri.fsPath === tempFilePath) {
            const newContent = doc.getText();
            context.workspaceState.update('generateModel', newContent);
            vscode.window.showInformationMessage('Código C# salvo com sucesso!');
        }
    });
}