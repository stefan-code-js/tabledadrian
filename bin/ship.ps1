param(
  [string]$Message = "chore: ship"
)

Write-Host "➤ staging changes…"
git add -A

# Check if anything is staged
$staged = (git diff --cached --name-only)
if ([string]::IsNullOrWhiteSpace($staged)) {
  Write-Host "ℹ no changes staged; creating an empty commit to trigger deploy"
  git commit --allow-empty -m "chore: trigger build" | Out-Null
} else {
  Write-Host "➤ commit: $Message"
  git commit -m $Message
}

Write-Host "➤ quick build sanity (next build)…"
npm run -s build
if ($LASTEXITCODE -ne 0) {
  Write-Error "✖ build failed — fix errors before pushing"
  exit 1
}

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
Write-Host "➤ pushing to $branch…"
git push origin $branch

Write-Host "✓ done. Cloudflare Pages will deploy automatically."
