# Interview Answers

## 1. Something I'm Proud Of

### The AI-Enhanced Contact Form with Iterative Draft Improvement

I'm particularly proud of the **contact form's AI features**, specifically the two-phase approach: **Create Draft** and **Improve Draft**.

#### What It Does

The contact form allows visitors to:
1. **Generate a draft**: Fill in name, email, and subject, then click the sparkles icon to have AI generate a professional message draft
2. **Iteratively refine the draft**: Once a draft exists, users can provide feedback ("make it more casual", "add more detail about X") and the AI improves it accordingly

#### Why I'm Proud of It

**1. User-Centric Design Decision**

Most AI-powered forms either do nothing or completely write the message for you. I designed this as a **collaborative tool**, the AI assists but the user stays in control. The iterative improvement loop lets users shape the message to their voice without starting from scratch.

**2. Clean Separation of Concerns**

The architecture demonstrates good software design:

- **Frontend (React)**: Manages UI state, loading indicators, and user feedback via toasts
- **API Layer (Next.js)**: Acts as a proxy to hide the backend URL and handle auth headers
- **Backend (FastAPI)**: Contains all AI logic, isolated and independently deployable

```
Contact Page → /api/backend/api/contact/draft → FastAPI (AI Processing)
```

**3. Progressive Enhancement**

The form works without AI features, so users can still manually type their message and submit via Formspree. The AI is additive, not required.

**4. State Management Thoughtfulness**

I track `hasDraft` separately from `formData.message` to conditionally show the "Improve Draft" UI only when contextually relevant. This avoids cluttering the interface when the user hasn't engaged with AI features yet.

```tsx
const [hasDraft, setHasDraft] = useState(false);
// ...
{hasDraft && formData.message && (
  <div className="flex items-center gap-2">
    {/* Improve Draft UI */}
  </div>
)}
```

**5. Keyboard Accessibility**

I added Enter key support for the improvement input, making the flow feel natural:

```tsx
onKeyDown={(e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleImproveDraft();
  }
}}
```

---

## 2. Something I'd Improve

### Lack of Automated Testing

#### What's Not Ideal

The project currently has **no automated tests**.

#### Why It's a Problem

1. **Regression Risk**: Any change to the AI integration, form logic, or API proxy could break functionality without immediate feedback

2. **Refactoring Confidence**: I hesitate to refactor code because it's hard to verify if everything still works correctly after changes

3. **CI/CD Weakness**: Without tests, the build pipeline only catches type errors and linting issues, not behavioral bugs

#### Specific Areas That Need Testing

| Area | Test Type | What to Test |
|------|-----------|--------------|
| `api.ts` utility | Unit (Vitest) | Error handling, URL construction, response parsing |
| Contact form | Integration | Draft creation flow, improvement flow, form submission |
| Chat page | Integration | Message sending, response rendering, reset functionality |
| Full user flows | E2E (Playwright) | Complete contact form journey with AI assistance |

#### How I Would Improve It

**1. Add Playwright for E2E Testing**

I already have experience with Playwright from my work at Emergn. I'd add tests like:

```typescript
test('contact form AI draft flow', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="subject"]', 'Project Inquiry');
  
  await page.click('[aria-label="Create draft"]');
  await expect(page.locator('[name="message"]')).not.toBeEmpty();
});
```

**2. Add Vitest for Unit Tests**

Fast, modern, and works well with TypeScript:

```typescript
describe('apiRequest', () => {
  it('constructs correct URL for nested endpoints', () => {
    // Test that 'api/contact/draft' becomes '/api/backend/api/contact/draft'
  });
  
  it('handles 500 errors gracefully', async () => {
    // Mock fetch to return 500, verify error is thrown with correct message
  });
});
```

**3. Set Up CI Pipeline**

```yaml
# .github/workflows/test.yml
- name: Run unit tests
  run: npm run test

- name: Run E2E tests
  run: npx playwright test
```
