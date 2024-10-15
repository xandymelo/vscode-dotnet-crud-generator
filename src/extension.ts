import * as vscode from 'vscode';
import { registerConfigureTextControllerTemplatesCommand } from './controller/configureTextControllerTemplate';
import { registerGenerateControllerCommand } from './controller/generateController';
import { registerConfigureTextModelsTemplatesCommand } from './model/configureTextModelsTemplate';
import { registerGenerateModelsCommand } from './model/generateModel';
import { registerResetDefaultSettings } from './resetDefaultSettings';
import { registerConfigureTextServiceTemplatesCommand } from './service/configureTextServiceTemplate';
import { registerGenerateServiceCommand } from './service/generateService';
export function activate(context: vscode.ExtensionContext) {
    
    registerGenerateModelsCommand(context);
    registerConfigureTextModelsTemplatesCommand(context);

    registerGenerateServiceCommand(context);
    registerConfigureTextServiceTemplatesCommand(context);
    
    registerGenerateControllerCommand(context);
    registerConfigureTextControllerTemplatesCommand(context);

    registerResetDefaultSettings(context);
}

export function deactivate() {}
