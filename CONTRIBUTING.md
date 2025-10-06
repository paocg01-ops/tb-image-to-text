# Contributing Guide

## Branching Strategy

We use a **feature branch workflow** with Vercel preview deployments.

### Branches

- **`main`** - Production branch (deployed to production URL)
- **`develop`** - Development branch (for integration)
- **`feature/*`** - Feature branches (for new features/fixes)

### Workflow

#### 1. Create a feature branch

```bash
# Make sure you're on develop
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/your-feature-name
```

#### 2. Make your changes

```bash
# Work on your feature
# Commit regularly with clear messages
git add .
git commit -m "feat: description of your changes"
```

#### 3. Push and create PR

```bash
# Push your feature branch
git push -u origin feature/your-feature-name
```

**Then on GitHub:**
1. Go to your repository
2. Click **"Compare & pull request"**
3. Set base branch to `develop`
4. Add description and create PR

#### 4. Vercel Preview Deployment

**Vercel will automatically:**
- ✅ Deploy a **preview URL** for your PR
- ✅ Run build checks
- ✅ Comment on the PR with the preview link

**Example preview URL:** `https://tb-image-to-text-git-feature-xyz-username.vercel.app`

#### 5. Test and Review

- Test your changes on the **preview URL**
- Request reviews if working with a team
- Make additional commits if needed (preview auto-updates)

#### 6. Merge to develop

Once approved and tested:
- Merge PR to `develop`
- Vercel deploys to a **staging URL** (develop branch)

#### 7. Release to production

When ready for production:
```bash
# Create PR from develop to main
git checkout develop
git pull origin develop
git checkout -b release/v1.x.x
git push -u origin release/v1.x.x
```

Create PR: `release/v1.x.x` → `main`

Once merged, Vercel deploys to **production URL**!

## Commit Message Convention

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add CSV export functionality
fix: resolve OCR parsing for kingdom names
docs: update README with deployment instructions
```

## Benefits of This Workflow

✅ **Safe deployments** - Test before production
✅ **Preview URLs** - Share work-in-progress easily
✅ **Code review** - Catch issues early
✅ **Clean history** - Organized commits
✅ **Rollback ready** - Easy to revert if needed
