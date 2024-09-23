import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';

export function getContent(fileName: string, defaultName: string) {
    const userConfigPath = path.join(vscode.env.appRoot, '..', '..', 'User', `${fileName}.cs`);
        let content = '';
        try {
            content = fs.readFileSync(userConfigPath, 'utf8');
            return content;
        } catch (error) {
            return defaultName;
        }
}