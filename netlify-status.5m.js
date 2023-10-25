#!/usr/bin/env -S -P/${HOME}/.deno/bin:/usr/local/bin:/opt/homebrew/bin deno run --allow-env --allow-net

// <xbar.title>Netlify Status</xbar.title>
// <xbar.desc>Displays the status of the most recent deployment for every Netlify site in the authorised account.</xbar.desc>
// <xbar.version>v1.0.0</xbar.version>
// <xbar.author>monooso</xbar.author>
// <xbar.dependencies>deno</xbar.dependencies>
// <xbar.var>string(NETLIFY_API_TOKEN=""): Your Netlify personal access token</xbar.var>

import { separator, xbar } from "https://deno.land/x/xbar@v2.1.0/mod.ts";

async function main() {
  // The Netlify logo, base64 encoded.
  const logo = "iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAABBdpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDpFQzNGNDNDODdCMkIxMUU5QkNENURBRDc2M0QxRTREQjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDpFQzNGNDNDOTdCMkIxMUU5QkNENURBRDc2M0QxRTREQjwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpFQzNGNDNDQjdCMkIxMUU5QkNENURBRDc2M0QxRTREQjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpFQzNGNDNDQTdC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";
  const deploys = await getDeploys();

  xbar([
    { templateImage: logo },
    separator,
    ...deploys.map(formatSiteInformation),
  ]);
}

// Returns information about the most recent deployment for each site.
async function getDeploys() {
  const sites = await fetchNetlify("sites");

  return (await Promise.all(sites.map(async (site) => {
    // Get the most recent deploy
    const build = (await fetchNetlify(`sites/${site.site_id}/builds`, { per_page: 1 }))[0];

    return {
      lastDeploy: new Date(build.created_at),
      name: site.name,
      status: build.done ? build.deploy_state : 'building',
      url: site.url,
    }
  }))).sort((a, b) => b.lastDeploy - a.lastDeploy);
}

// Fetches data from the Netlify API.
async function fetchNetlify(endpoint, params = {}) {
  const bearerToken = Deno.env.get("NETLIFY_API_TOKEN");
  const querystring = new URLSearchParams(params);
  const url = new URL(`https://api.netlify.com/api/v1/${endpoint}?${querystring}`);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${bearerToken}`);

  const response = await fetch(url, { headers });
  return response.json();
}

// Returns an xbar menu item representing the site.
function formatSiteInformation(site) {
  const status = formatStatus(site.status);
  const ago = humanizeLastDeploy(site.lastDeploy);

  return { text: `${status} ${site.name} (${ago})`, href: site.url };
}

// Returns an emoji representing the deploy status.
function formatStatus(status) {
  switch (status) {
    case 'building':
      return ':hourglass:';
    case 'ready':
      return ':thumbsup:';
    case 'error':
      return ':warning:';
    default:
      return ':shrug:';
  }
}

// Returns a humanized string representing the time since the last deploy.
function humanizeLastDeploy(lastDeploy) {
  const diffInSeconds = (new Date() - lastDeploy) / 1000;
  switch (true) {
    case diffInSeconds < 60:
      return 'a few seconds ago';
    case diffInSeconds < 3600:
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    case diffInSeconds < 86400:
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    case diffInSeconds < 604800:
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    default:
      return 'some time ago';
  }
}

main();
