import * as vscode from "vscode";
import packageJson from "./package.json.gen";

const commands = packageJson.contributes.commands;
type Command = (typeof commands)[number][`command`];

export const registerCommand = (
  command: Command,
  callback: (...args: any[]) => any
) => vscode.commands.registerCommand(command, callback);
