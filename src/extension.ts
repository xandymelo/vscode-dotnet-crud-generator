import * as vscode from 'vscode';
import { registerGenerateModelsCommand } from './model/generateModel';
import { registerConfigureTextModelsTemplatesCommand } from './model/configureTextModelsTemplate';
import { registerGenerateServiceCommand } from './service/generateService';
import { registerConfigureTextServiceTemplatesCommand } from './service/configureTextServiceTemplate';
export function activate(context: vscode.ExtensionContext) {
    
    registerGenerateModelsCommand(context);
    registerConfigureTextModelsTemplatesCommand(context);

    registerGenerateServiceCommand(context);
    registerConfigureTextServiceTemplatesCommand(context);
}

export function deactivate() {}
