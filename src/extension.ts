import * as vscode from 'vscode';
import { registerGenerateModelsCommand } from './generateModel';
import { registerConfigureTextTemplatesCommand } from './configureTextTemplate';
export function activate(context: vscode.ExtensionContext) {
    registerGenerateModelsCommand(context);
    registerConfigureTextTemplatesCommand(context);
}

export function deactivate() {}
