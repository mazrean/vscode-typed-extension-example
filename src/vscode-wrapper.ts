import * as vscode from "vscode";
import packageJson from "./package.json.gen";

const commands = packageJson.contributes.commands;
type Command = (typeof commands)[number][`command`];

export const registerCommand = (
  command: Command,
  callback: (...args: any[]) => any
) => vscode.commands.registerCommand(command, callback);

const conf = packageJson.contributes.configuration.properties;
type Config = typeof conf;
type TypeMap = {
  boolean: boolean;
  string: string;
  number: number;
};
type ConvertType<T extends keyof Config> = TypeMap[Config[T]["type"]];

export const config = <T extends keyof Config>(key: T) => {
  let defaultValue: ConvertType<T>;
  switch (conf[key].type as "string" | "boolean" | "number") {
    case "string":
      defaultValue = conf[key].default as unknown as ConvertType<T>;
      break;
    case "boolean":
      defaultValue = Boolean(conf[key].default) as unknown as ConvertType<T>;
      break;
    case "number":
      defaultValue = Number(conf[key].default) as unknown as ConvertType<T>;
      break;
  }

  return (
    vscode.workspace.getConfiguration().get<ConvertType<T>>(key) ?? defaultValue
  );
};
