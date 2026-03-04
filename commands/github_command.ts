import axios from "axios";

class GithubCommand {
  private baseUrl = "https://api.github.com";

  register(program: any): void {
    const github = program
      .command("github")
      .description("GitHub user and repo information");

    github
      .command("user <username>")
      .description("Get GitHub user profile info")
      .action(async (username: string) => {
        await this.getUserInfo(username);
      });

    github
      .command("repos <username>")
      .description("List public repos for a GitHub user")
      .option("-l, --limit <n>", "Limit number of repos shown", "5")
      .action(async (username: string, options: any) => {
        await this.getUserRepos(username, parseInt(options.limit));
      });
  }

  async getUserInfo(username: string): Promise<void> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/users/${username}`);
      console.log(`\nGitHub Profile: ${username}`);
      console.log(`Name:         ${data.name || "N/A"}`);
      console.log(`Bio:          ${data.bio || "N/A"}`);
      console.log(`Location:     ${data.location || "N/A"}`);
      console.log(`Public Repos: ${data.public_repos}`);
      console.log(`Followers:    ${data.followers}`);
      console.log(`Following:    ${data.following}`);
      console.log(`Profile:      ${data.html_url}\n`);
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.log(`User "${username}" not found on GitHub.`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  async getUserRepos(username: string, limit: number): Promise<void> {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}/users/${username}/repos?sort=updated&per_page=${limit}`
      );

      if (data.length === 0) {
        console.log("No public repositories found.");
        return;
      }

      console.log(`\nRepos for ${username}:\n`);
      data.slice(0, limit).forEach((repo: any, i: number) => {
        console.log(`${i + 1}. ${repo.name}`);
        console.log(`   ${repo.description || "No description"}`);
        console.log(`   Stars: ${repo.stargazers_count}  Forks: ${repo.forks_count}  Language: ${repo.language || "N/A"}`);
        console.log(`   ${repo.html_url}\n`);
      });
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }
  }
}

export default GithubCommand;