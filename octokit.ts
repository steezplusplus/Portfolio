import { Octokit } from '@octokit/rest';

const GIT_PAT = process.env.GIT_PAT;
const GIT_USERNAME = process.env.GIT_USERNAME; // TODO Type assertion with Zod

export const octokit = new Octokit({
  auth: GIT_PAT,
});

/**
 * https://octokit.github.io/rest.js/v20#users-get-authenticated
 */
export async function getUser() {
  try {
    const { data } = await octokit.rest.users.getAuthenticated();

    const filteredData = {
      username: data.login,
      avatar_url: data.avatar_url,
      url: data.html_url,
      name: data.name,
      location: data.location,
      bio: data.bio,
      num_public_repos: data.public_repos,
      num_public_gists: data.public_gists,
      num_followers: data.followers,
      created_at: data.created_at,
    };

    return filteredData;
  } catch (error) {
    console.error('[GET_USER]');
    throw error;
  }
}

/**
 * https://octokit.github.io/rest.js/v20#repos-get
 * @param repo The name of the repository without the .git extension.
 */
export async function getProject(repoName: string) {
  if (!GIT_USERNAME) {
    throw new Error('[GET_PROJECT]: GIT_USERNAME is required');
  }

  try {
    const { data } = await octokit.rest.repos.get({
      owner: GIT_USERNAME,
      repo: repoName,
    });

    const filteredProjectData = {
      html_url: data.html_url,
      description: data.description,
      language: data.language,
      num_stars: data.stargazers_count,
      num_forks: data.forks,
      num_subscribers: data.subscribers_count,
      license: data.license,
    };

    return filteredProjectData;
  } catch (error) {
    console.error('[GET_PROJECT]:', error);
  }
}
