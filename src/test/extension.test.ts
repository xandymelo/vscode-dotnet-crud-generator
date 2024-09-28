import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as sinon from 'sinon';

suite('Generate Models Command Tests', () => {
    const testFolderPath = path.join(__dirname, 'testWorkspace');
    suiteSetup(() => {
        if (!fs.existsSync(testFolderPath)) {
            fs.mkdirSync(testFolderPath);
        }
    });
    test('Should generate entity folder and model files', async () => {
        const uri = vscode.Uri.file(testFolderPath);
        const entityName = 'Product';
		const folderPath = uri.fsPath;
        const entityFolderPath = path.join(folderPath, entityName);
        const showInputBoxStub = sinon.stub(vscode.window, 'showInputBox').resolves(entityName);
        await vscode.commands.executeCommand('extension.generateModels', uri);
        assert.strictEqual(fs.existsSync(entityFolderPath), true, 'The entity folder should be created');
        const expectedFiles = [`Create${entityName}Model.cs`, `Update${entityName}Model.cs`, `${entityName}Model.cs`];
        expectedFiles.forEach(file => {
            const filePath = path.join(entityFolderPath, file);
            assert.strictEqual(fs.existsSync(filePath), true, `File ${file} should be created`);
        });
        showInputBoxStub.restore();
    });
    test('Should generate Controller file', async () => {
        const uri = vscode.Uri.file(testFolderPath);
        const entityName = 'Product';
		const folderPath = uri.fsPath;
        const showInputBoxStub = sinon.stub(vscode.window, 'showInputBox').resolves(entityName);
        await vscode.commands.executeCommand('extension.generateController', uri);
        const file = `${entityName}Controller.cs`;
        const filePath = path.join(folderPath, file);
        assert.strictEqual(fs.existsSync(filePath), true, `File ${file} should be created`);
        showInputBoxStub.restore();
    });

    test('Should generate Service file', async () => {
        const uri = vscode.Uri.file(testFolderPath);
        const entityName = 'Product';
		const folderPath = uri.fsPath;
        const showInputBoxStub = sinon.stub(vscode.window, 'showInputBox').resolves(entityName);
        await vscode.commands.executeCommand('extension.generateService', uri);
        const file = `${entityName}Service.cs`;
        const filePath = path.join(folderPath, file);
        assert.strictEqual(fs.existsSync(filePath), true, `File ${file} should be created`);
        showInputBoxStub.restore();
    });

	suiteTeardown(async () => {
		// Adiciona um pequeno atraso para garantir que todos os recursos sejam liberados
		await new Promise(resolve => setTimeout(resolve, 100)); 
	
		// Cleanup test workspace
		if (fs.existsSync(testFolderPath)) {
			try {
				fs.rmSync(testFolderPath, { recursive: true, force: true });
			} catch (error) {
				console.error('Erro ao remover a pasta de teste:', error);
			}
		}
	});
});
