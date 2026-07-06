import type { ReactNode } from "react";
import branchCreateAsset from "@/assets/branch-create.png.asset.json";

export type Subsection = { id: string; title: string };
export type Section = {
  id: string;
  number: number;
  title: string;
  subsections: Subsection[];
  content: ReactNode;
};

function Callout({ children, label = "Note" }: { children: ReactNode; label?: string }) {
  return (
    <aside className="my-5 rounded-md border-l-4 border-primary bg-accent/40 px-4 py-3 text-sm text-foreground">
      <span className="mr-2 font-semibold text-primary">{label}:</span>
      {children}
    </aside>
  );
}

function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-ink"
    >
      {children}
    </h3>
  );
}

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`my-4 leading-7 text-foreground/85 ${className}`}>{children}</p>;
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="my-4 list-disc space-y-1.5 pl-6 leading-7 text-foreground/85 marker:text-primary/60">
      {children}
    </ul>
  );
}

function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 leading-7 text-foreground/85 marker:font-semibold marker:text-primary">
      {children}
    </ol>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-panel">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border odd:bg-background even:bg-panel/40">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 align-top text-foreground/85">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-ink">{children}</strong>
);

export const sections: Section[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction",
    subsections: [
      { id: "what-is-valuxpert", title: "What is Valuxpert?" },
      { id: "who-is-it-for", title: "Who is Valuxpert for?" },
      { id: "what-can-you-do", title: "What you can do" },
    ],
    content: (
      <>
        <H3 id="what-is-valuxpert">What is Valuxpert?</H3>
        <P>
          Valuxpert is a web-based platform that helps businesses manage their company and staff
          all in one place. With Valuxpert, company owners can create their own company workspace,
          invite employees, assign roles, and stay organized — without switching between multiple
          tools.
        </P>
        <H3 id="who-is-it-for">Who is Valuxpert for?</H3>
        <P>Valuxpert is built for two types of users:</P>
        <UL>
          <li>
            <B>Admins (Company Owners)</B> — People who create and manage a company workspace,
            including adding staff and configuring settings.
          </li>
          <li>
            <B>Staff Members (Employees)</B> — People invited to join a company workspace by an
            Admin.
          </li>
        </UL>
        <H3 id="what-can-you-do">What can you do with Valuxpert?</H3>
        <UL>
          <li>Create and manage your company profile</li>
          <li>Add and organize your staff</li>
          <li>Assign roles and control access levels</li>
          <li>Manage company and account settings from one dashboard</li>
        </UL>
      </>
    ),
  },
  {
    id: "getting-started",
    number: 2,
    title: "Getting Started",
    subsections: [
      { id: "requirements", title: "Requirements" },
      { id: "logging-in", title: "Logging in" },
      { id: "dashboard-overview", title: "Dashboard overview" },
    ],
    content: (
      <>
        <H3 id="requirements">Requirements</H3>
        <P>Valuxpert is fully web-based — no installation or download is needed. All you need is:</P>
        <UL>
          <li>A modern web browser (Chrome, Firefox, Safari, or Edge)</li>
          <li>A stable internet connection</li>
        </UL>
        <H3 id="logging-in">Logging in</H3>
        <OL>
          <li>Go to the Valuxpert login page.</li>
          <li>
            Enter your registered <B>email address</B> and <B>password</B>.
          </li>
          <li>
            Click <B>Log In</B>.
          </li>
        </OL>
        <H3 id="dashboard-overview">Dashboard overview</H3>
        <P>Once logged in, you will see your main dashboard. Here is what each section does:</P>
        <Table
          head={["Section", "Description"]}
          rows={[
            [<B>Publish Offer</B>, "Create and manage job offers for candidates and employees."],
            [<B>Cases</B>, "Manage case records, track progress, and update case information."],
            [<B>Branch</B>, "Create and manage branch details and related operations."],
            [<B>Finance</B>, "Monitor financial transactions, payments, and financial records."],
            [<B>MAP</B>, "View and manage location-based information and mapping services."],
            [<B>FORCE PIN</B>, "Generate and manage secure PINs for authentication and verification."],
            [<B>Report</B>, "Generate and view reports for different modules and activities."],
            [<B>Master</B>, "Manage master data and system-wide configuration settings."],
            [<B>Admins</B>, "Create and manage administrators, users, roles, and permissions."],
            [<B>HRMS</B>, "Manage employee records, attendance, payroll, and HR-related activities."],
            [<B>Staff</B>, "View and manage staff profiles, information, and employment details."],
            [<B>Unapproved</B>, "Review and manage pending records awaiting approval."],
            [<B>Add-Goes</B>, "Create and manage employee Add-Goes requests and related records."],
            [<B>Celebration</B>, "Manage employee birthdays, anniversaries, and organizational events."],
            [<B>Settings</B>, "Configure application preferences, system settings, and user options."],
          ]}
        />
      </>
    ),
  },
  {
    id: "company-setup",
    number: 3,
    title: "Company Setup",
    subsections: [
      { id: "creating-your-company", title: "Creating your company" },
    ],
    content: (
      <>
        <H3 id="creating-your-company">Creating your company</H3>
        <OL>
          <li>
            From the dashboard, click <B>Admins</B>.
          </li>
          <li>
            Click on <B>Companies</B>.
          </li>
        </OL>
        <P>Fill the following details:</P>
        <UL>
          <li>
            <B>Display Name</B> — The name that is visible to the others.
          </li>
        </UL>
        <P>
          Then click <B>Submit</B>.
        </P>
      </>
    ),
  },
  {
    id: "staff-management",
    number: 4,
    title: "Staff Management",
    subsections: [
      { id: "adding-branch", title: "Adding a new Branch" },
      { id: "adding-new-staff-member", title: "Add a New Staff Member" },
    ],
    content: (
      <>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex-1">
            <H3 id="adding-branch">Adding a new Branch</H3>
            <OL>
              <li>
                Go to the <B>Branch</B> from your dashboard.
              </li>
              <li>
                Click <B>Create Branch</B>.
              </li>
              <li>Enter the Branch details:</li>
            </OL>
            <UL>
              <li>
                <B>Name</B>
              </li>
              <li>
                <B>Email Address</B>
              </li>
              <li>
                <B>Contact Number</B>
              </li>
              <li>
                <B>Alternative Number</B>
              </li>
              <li>
                <B>Landline Number</B>
              </li>
              <li>
                <B>Address</B>
              </li>
            </UL>
            <P>
              Then click <B>Submit</B>.
            </P>
          </div>
          <div className="shrink-0 lg:w-[360px] xl:w-[420px]">
            <img
              src="/newbranch.png"
              alt="Branch creation form with the sidebar menu and Branch Details fields"
              className="rounded-lg border border-border shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
        <H3 id="creating-roles">Creating Roles for Staff</H3>
        <P>
          The Roles feature allows administrators to create and manage staff roles within the
          system. These roles can be assigned to staff members to define their responsibilities
          and access permissions.
        </P>
        <OL>
          <li>
            From the Dashboard click on the <B>Admins</B>.
          </li>
          <li>
            Click <B>Roles</B>.
          </li>
        </OL>
        <P>Enter the following role details:</P>
        <UL>
          <li>
            <B>Display Name</B>
          </li>
          <li>
            <B>Description</B>
          </li>
          <li>
            <B>Select Color</B>
          </li>
        </UL>
        <P>
          After entering the required information, click the <B>Submit</B> button.
        </P>
        <Callout>
          You can create multiple roles from here.
        </Callout>
        <H3 id="adding-new-staff-member">Add a New Staff Member</H3>
        <P>
          This feature allows you to add a new staff member to your company.
        </P>
        <OL>
          <li>
            Click on <B>Staff</B>.
          </li>
          <li>
            Select <B>All Staff</B>.
          </li>
          <li>
            Click <B>Add Staff</B>.
          </li>
          <li>Fill the employee's information.</li>
          <li>
            Click <B>Create Employee</B>.
          </li>
        </OL>
        <P>
          The new staff member will be successfully added to your company.
        </P>
      </>
    ),
  },
    {
    id: "admin-settings",
    number: 5,
    title: "Admin & Settings",
    subsections: [
      { id: "company-settings", title: "Company settings" },
      { id: "admin-module", title: "Admin Module" },
    ],
    content: (
      <>
        <H3 id="company-settings">Company settings</H3>
        <OL>
          <li>
            Go to <B>Admins</B> from the dashboard.
          </li>
          <li>
            Select <B>Companies</B>.
          </li>
        </OL>
        <P>Options available:</P>
        <UL>
          <li>
            <B>Change Company Name</B> — Update the name shown across your workspace.
          </li>
          <li>
            <B>Delete Company</B> — Permanently remove your company and all data. (This cannot be
            undone.)
          </li>
        </UL>
        <H3 id="admin-module">Admin Module</H3>
        <P>
          The Admin module is used to manage users, permissions, roles, companies, and monitor login
          activities. It allows administrators to control user access, assign responsibilities, and
          maintain security across the application.
        </P>
        <H3 id="admin-properties">Admin Properties</H3>
        <Table
          head={["Property", "Description"]}
          rows={[
            [<B>All Users</B>, "Displays a list of all registered users along with their details and current status."],
            [<B>Add User</B>, "Allows the administrator to create a new user account by entering the required information."],
            [<B>Trash Users</B>, "Displays deleted or inactive users. Administrators can restore or permanently remove these users."],
            [<B>Permissions</B>, "Used to create and manage permissions that define what actions users can perform in the system."],
            [<B>Roles</B>, "Allows administrators to create roles and assign multiple permissions to those roles."],
            [<B>Companies</B>, "Used to manage company information associated with the application."],
            [<B>Login Activity</B>, "Displays login history, including login time, user information, and activity for auditing purposes."],
          ]}
        />
      </>
    ),
  },
  {
    id: "roles-permissions",
    number: 6,
    title: "Roles & Permissions",
    subsections: [
      { id: "permissions-matrix", title: "Permissions matrix" },
      { id: "changing-role", title: "Changing a staff member's role" },
    ],
    content: (
      <>
        <P>Valuxpert has two user roles. Here is what each role can and cannot do:</P>
        <H3 id="permissions-matrix">Permissions matrix</H3>
        <Table
          head={["Permission", "Admin", "Staff Member"]}
          rows={[
            ["Create & edit company profile", "✅", "❌"],
            ["Add & remove staff members", "✅", "❌"],
            ["Assign staff roles", "✅", "❌"],
            ["View staff directory", "✅", "✅"],
            ["View own profile", "✅", "✅"],
            ["Access company settings", "✅", "❌"],
            ["Manage billing", "✅", "❌"],
          ]}
        />
        <H3 id="changing-role">Changing a staff member's role</H3>
        <OL>
          <li>
            Click on the <B>Staff</B> from your dashboard.
          </li>
          <li>
            Then click on <B>All Staff</B>.
          </li>
          <li>
            Click on <B>View Profile</B> from the staff directory.
          </li>
          <li>Update role.</li>
          <li>
            Then click <B>Save</B>.
          </li>
        </OL>
      </>
    ),
  },
    {
    id: "troubleshooting",
    number: 7,
    title: "Troubleshooting",
    subsections: [
      { id: "cannot-log-in", title: "Cannot log in" },
      { id: "deleted-staff", title: "Accidentally deleted a staff member" },
      { id: "page-not-loading", title: "Page not loading correctly" },
    ],
    content: (
      <>
        <H3 id="cannot-log-in">I cannot log in.</H3>
        <P>
          Make sure you are using the correct email and password. If you have forgotten your
          password, contact the ValuXpert Superadmin.
        </P>
        <H3 id="deleted-staff">I accidentally deleted a staff member.</H3>
        <P>
          Once a staff member is permanently removed, their record cannot be recovered. You will
          need to add them again as a new staff member.
        </P>
        <H3 id="page-not-loading">The page is not loading correctly.</H3>
        <P>
          Try refreshing your browser, clearing your cache, or switching to a different browser
          (Chrome or Firefox recommended).
        </P>
      </>
    ),
  },
    {
    id: "faq",
    number: 8,
    title: "FAQ",
    subsections: [
      { id: "faq-multiple-companies", title: "More than one company?" },
      { id: "faq-staff-create-company", title: "Can staff create a company?" },
      { id: "faq-data-security", title: "Data security" },
      { id: "faq-cancel-subscription", title: "Cancelling subscription" },
    ],
    content: (
      <>
        <H3 id="faq-multiple-companies">Can I have more than one company under my account?</H3>
        <P>Currently, each Valuxpert account is linked to one company workspace.</P>
        <H3 id="faq-staff-create-company">Can a staff member create their own company?</H3>
        <P>
          No. Only Admins can create a company. Staff members are invited to join an existing
          workspace.
        </P>
        <H3 id="faq-data-security">Is my company data secure?</H3>
        <P>Yes. Valuxpert uses industry-standard encryption to protect your data.</P>
        <H3 id="faq-cancel-subscription">What happens if I cancel my subscription?</H3>
        <P>
          Your workspace will remain accessible until the end of your current billing period. After
          that, access will be suspended.
        </P>
      </>
    ),
  },
  {
    id: "glossary",
    number: 9,
    title: "Glossary",
    subsections: [{ id: "glossary-terms", title: "Terms" }],
    content: (
      <>
        <H3 id="glossary-terms">Terms</H3>
        <Table
          head={["Term", "Definition"]}
          rows={[
            ["Tenant", "A company or organization that uses Valuxpert as their workspace."],
            ["Workspace", "Your company's dedicated environment inside Valuxpert."],
            ["Admin", "A user with full control over the company workspace and staff."],
            ["Staff Member", "An employee invited to a company workspace with limited access."],
            ["Dashboard", "The main screen you see after logging in."],
            ["Staff Directory", "A list of all staff members within your company."],
            ["Deactivate", "Removing a staff member's access without deleting their record."],
            ["Subscription", "The paid plan that gives you access to Valuxpert."],
          ]}
        />
      </>
    ),
  },
  {
    id: "contact-support",
    number: 10,
    title: "Contact & Support",
    subsections: [
      { id: "contact-email", title: "Email support" },
      { id: "what-to-include", title: "What to include" },
    ],
    content: (
      <>
        <H3 id="contact-email">Email support</H3>
        <P>
          If you need help with anything not covered in this documentation, reach out to the
          Valuxpert support team:
        </P>
        <P>
          <B>Email:</B>{" "}
          <a
            href="mailto:support@valuxpert.com"
            className="text-primary underline-offset-4 hover:underline"
          >
            support@valuxpert.com
          </a>
        </P>
        <H3 id="what-to-include">What to include</H3>
        <P>When contacting support, please include:</P>
        <UL>
          <li>Your registered email address</li>
          <li>The name of your company workspace</li>
          <li>A clear description of the issue</li>
          <li>Any error messages you have seen</li>
        </UL>
        <P className="mt-8 text-center text-sm italic text-muted-foreground">
          Valuxpert — Manage your company and staff, all in one place.
        </P>
      </>
    ),
  },
];
