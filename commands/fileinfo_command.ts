import fs from "fs";
import path from "path";

class FileInfoCommand {
  register(program: any): void {
    program
      .command("fileinfo <filename>")
      .description("Display information about a file")
      .option("-l, --lines", "Count lines in the file")
      .action((filename: string, options: any) => {
        this.showFileInfo(filename, options);
      });
  }

  showFileInfo(filename: string, options: any): void {
    const filePath = path.resolve(filename);

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filename}`);
      return;
    }

    const stats = fs.statSync(filePath);

    console.log(`\nFile: ${path.basename(filePath)}`);
    console.log(`Path: ${filePath}`);
    console.log(`Size: ${this.formatBytes(stats.size)}`);
    console.log(`Extension: ${path.extname(filePath) || "none"}`);
    console.log(`Created: ${stats.birthtime.toLocaleString()}`);
    console.log(`Modified: ${stats.mtime.toLocaleString()}`);
    console.log(`Type: ${stats.isDirectory() ? "Directory" : "File"}`);

    if (options.lines && stats.isFile()) {
      const content = fs.readFileSync(filePath, "utf8");
      console.log(`Lines: ${content.split("\n").length}`);
      console.log(`Words: ${content.split(/\s+/).filter(Boolean).length}`);
      console.log(`Characters: ${content.length}`);
    }

    console.log();
  }

  formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

export default FileInfoCommand;