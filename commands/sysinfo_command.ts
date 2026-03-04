import os from "os";

class SysinfoCommand {
  register(program: any): void {
    program
      .command("sysinfo")
      .description("Display system information")
      .option("-a, --all", "Show all details including CPUs")
      .action((options: any) => {
        this.showSysinfo(options);
      });
  }

  formatBytes(bytes: number): string {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  }

  formatUptime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  }

  showSysinfo(options: any): void {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    console.log("\nSystem Information\n");
    console.log(`Platform:     ${os.platform()} (${os.type()})`);
    console.log(`Architecture: ${os.arch()}`);
    console.log(`OS Release:   ${os.release()}`);
    console.log(`Hostname:     ${os.hostname()}`);
    console.log(`User:         ${os.userInfo().username}`);
    console.log(`Uptime:       ${this.formatUptime(os.uptime())}`);
    console.log(`Total RAM:    ${this.formatBytes(totalMem)}`);
    console.log(`Free RAM:     ${this.formatBytes(freeMem)}`);
    console.log(`Used RAM:     ${this.formatBytes(usedMem)} (${Math.round((usedMem / totalMem) * 100)}%)`);
    console.log(`Temp Dir:     ${os.tmpdir()}`);
    console.log(`Home Dir:     ${os.homedir()}`);

    if (options.all) {
      const cpus = os.cpus();
      console.log(`\nCPUs (${cpus.length} cores):\n`);
      cpus.forEach((cpu, i) => {
        console.log(`  Core ${i + 1}: ${cpu.model} @ ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
    }

    console.log();
  }
}

export default SysinfoCommand;