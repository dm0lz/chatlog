/* esm.sh - esbuild bundle(@octokit/webhooks@13.2.6) es2022 production */
import { Buffer as __Buffer$ } from "./buffer.bundle.mjs";
var __setImmediate$ = (cb, ...args) => setTimeout(cb, 0, ...args);
import u from "./aggregate-error.mjs";
import { sign as H, verify as S } from "./webhooks-methods.mjs";
import $ from "./aggregate-error.mjs";
import { verify as z } from "./webhooks-methods.mjs";
import P from "./aggregate-error.mjs";
var p = (r) => ({
    debug: () => {},
    info: () => {},
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    ...r,
  }),
  w = [
    "branch_protection_configuration",
    "branch_protection_configuration.disabled",
    "branch_protection_configuration.enabled",
    "branch_protection_rule",
    "branch_protection_rule.created",
    "branch_protection_rule.deleted",
    "branch_protection_rule.edited",
    "check_run",
    "check_run.completed",
    "check_run.created",
    "check_run.requested_action",
    "check_run.rerequested",
    "check_suite",
    "check_suite.completed",
    "check_suite.requested",
    "check_suite.rerequested",
    "code_scanning_alert",
    "code_scanning_alert.appeared_in_branch",
    "code_scanning_alert.closed_by_user",
    "code_scanning_alert.created",
    "code_scanning_alert.fixed",
    "code_scanning_alert.reopened",
    "code_scanning_alert.reopened_by_user",
    "commit_comment",
    "commit_comment.created",
    "create",
    "custom_property",
    "custom_property.created",
    "custom_property.deleted",
    "custom_property.updated",
    "custom_property_values",
    "custom_property_values.updated",
    "delete",
    "dependabot_alert",
    "dependabot_alert.auto_dismissed",
    "dependabot_alert.auto_reopened",
    "dependabot_alert.created",
    "dependabot_alert.dismissed",
    "dependabot_alert.fixed",
    "dependabot_alert.reintroduced",
    "dependabot_alert.reopened",
    "deploy_key",
    "deploy_key.created",
    "deploy_key.deleted",
    "deployment",
    "deployment.created",
    "deployment_protection_rule",
    "deployment_protection_rule.requested",
    "deployment_review",
    "deployment_review.approved",
    "deployment_review.rejected",
    "deployment_review.requested",
    "deployment_status",
    "deployment_status.created",
    "discussion",
    "discussion.answered",
    "discussion.category_changed",
    "discussion.closed",
    "discussion.created",
    "discussion.deleted",
    "discussion.edited",
    "discussion.labeled",
    "discussion.locked",
    "discussion.pinned",
    "discussion.reopened",
    "discussion.transferred",
    "discussion.unanswered",
    "discussion.unlabeled",
    "discussion.unlocked",
    "discussion.unpinned",
    "discussion_comment",
    "discussion_comment.created",
    "discussion_comment.deleted",
    "discussion_comment.edited",
    "fork",
    "github_app_authorization",
    "github_app_authorization.revoked",
    "gollum",
    "installation",
    "installation.created",
    "installation.deleted",
    "installation.new_permissions_accepted",
    "installation.suspend",
    "installation.unsuspend",
    "installation_repositories",
    "installation_repositories.added",
    "installation_repositories.removed",
    "installation_target",
    "installation_target.renamed",
    "issue_comment",
    "issue_comment.created",
    "issue_comment.deleted",
    "issue_comment.edited",
    "issues",
    "issues.assigned",
    "issues.closed",
    "issues.deleted",
    "issues.demilestoned",
    "issues.edited",
    "issues.labeled",
    "issues.locked",
    "issues.milestoned",
    "issues.opened",
    "issues.pinned",
    "issues.reopened",
    "issues.transferred",
    "issues.unassigned",
    "issues.unlabeled",
    "issues.unlocked",
    "issues.unpinned",
    "label",
    "label.created",
    "label.deleted",
    "label.edited",
    "marketplace_purchase",
    "marketplace_purchase.cancelled",
    "marketplace_purchase.changed",
    "marketplace_purchase.pending_change",
    "marketplace_purchase.pending_change_cancelled",
    "marketplace_purchase.purchased",
    "member",
    "member.added",
    "member.edited",
    "member.removed",
    "membership",
    "membership.added",
    "membership.removed",
    "merge_group",
    "merge_group.checks_requested",
    "merge_group.destroyed",
    "meta",
    "meta.deleted",
    "milestone",
    "milestone.closed",
    "milestone.created",
    "milestone.deleted",
    "milestone.edited",
    "milestone.opened",
    "org_block",
    "org_block.blocked",
    "org_block.unblocked",
    "organization",
    "organization.deleted",
    "organization.member_added",
    "organization.member_invited",
    "organization.member_removed",
    "organization.renamed",
    "package",
    "package.published",
    "package.updated",
    "page_build",
    "personal_access_token_request",
    "personal_access_token_request.approved",
    "personal_access_token_request.cancelled",
    "personal_access_token_request.created",
    "personal_access_token_request.denied",
    "ping",
    "project",
    "project.closed",
    "project.created",
    "project.deleted",
    "project.edited",
    "project.reopened",
    "project_card",
    "project_card.converted",
    "project_card.created",
    "project_card.deleted",
    "project_card.edited",
    "project_card.moved",
    "project_column",
    "project_column.created",
    "project_column.deleted",
    "project_column.edited",
    "project_column.moved",
    "projects_v2",
    "projects_v2.closed",
    "projects_v2.created",
    "projects_v2.deleted",
    "projects_v2.edited",
    "projects_v2.reopened",
    "projects_v2_item",
    "projects_v2_item.archived",
    "projects_v2_item.converted",
    "projects_v2_item.created",
    "projects_v2_item.deleted",
    "projects_v2_item.edited",
    "projects_v2_item.reordered",
    "projects_v2_item.restored",
    "public",
    "pull_request",
    "pull_request.assigned",
    "pull_request.auto_merge_disabled",
    "pull_request.auto_merge_enabled",
    "pull_request.closed",
    "pull_request.converted_to_draft",
    "pull_request.demilestoned",
    "pull_request.dequeued",
    "pull_request.edited",
    "pull_request.enqueued",
    "pull_request.labeled",
    "pull_request.locked",
    "pull_request.milestoned",
    "pull_request.opened",
    "pull_request.ready_for_review",
    "pull_request.reopened",
    "pull_request.review_request_removed",
    "pull_request.review_requested",
    "pull_request.synchronize",
    "pull_request.unassigned",
    "pull_request.unlabeled",
    "pull_request.unlocked",
    "pull_request_review",
    "pull_request_review.dismissed",
    "pull_request_review.edited",
    "pull_request_review.submitted",
    "pull_request_review_comment",
    "pull_request_review_comment.created",
    "pull_request_review_comment.deleted",
    "pull_request_review_comment.edited",
    "pull_request_review_thread",
    "pull_request_review_thread.resolved",
    "pull_request_review_thread.unresolved",
    "push",
    "registry_package",
    "registry_package.published",
    "registry_package.updated",
    "release",
    "release.created",
    "release.deleted",
    "release.edited",
    "release.prereleased",
    "release.published",
    "release.released",
    "release.unpublished",
    "repository",
    "repository.archived",
    "repository.created",
    "repository.deleted",
    "repository.edited",
    "repository.privatized",
    "repository.publicized",
    "repository.renamed",
    "repository.transferred",
    "repository.unarchived",
    "repository_advisory",
    "repository_advisory.published",
    "repository_advisory.reported",
    "repository_dispatch",
    "repository_dispatch.sample.collected",
    "repository_import",
    "repository_ruleset",
    "repository_ruleset.created",
    "repository_ruleset.deleted",
    "repository_ruleset.edited",
    "repository_vulnerability_alert",
    "repository_vulnerability_alert.create",
    "repository_vulnerability_alert.dismiss",
    "repository_vulnerability_alert.reopen",
    "repository_vulnerability_alert.resolve",
    "secret_scanning_alert",
    "secret_scanning_alert.created",
    "secret_scanning_alert.reopened",
    "secret_scanning_alert.resolved",
    "secret_scanning_alert.revoked",
    "secret_scanning_alert.validated",
    "secret_scanning_alert_location",
    "secret_scanning_alert_location.created",
    "security_advisory",
    "security_advisory.published",
    "security_advisory.updated",
    "security_advisory.withdrawn",
    "security_and_analysis",
    "sponsorship",
    "sponsorship.cancelled",
    "sponsorship.created",
    "sponsorship.edited",
    "sponsorship.pending_cancellation",
    "sponsorship.pending_tier_change",
    "sponsorship.tier_changed",
    "star",
    "star.created",
    "star.deleted",
    "status",
    "team",
    "team.added_to_repository",
    "team.created",
    "team.deleted",
    "team.edited",
    "team.removed_from_repository",
    "team_add",
    "watch",
    "watch.started",
    "workflow_dispatch",
    "workflow_job",
    "workflow_job.completed",
    "workflow_job.in_progress",
    "workflow_job.queued",
    "workflow_job.waiting",
    "workflow_run",
    "workflow_run.completed",
    "workflow_run.in_progress",
    "workflow_run.requested",
  ];
function m(r, e, o) {
  r.hooks[e] || (r.hooks[e] = []), r.hooks[e].push(o);
}
function v(r, e, o) {
  if (Array.isArray(e)) {
    e.forEach((t) => v(r, t, o));
    return;
  }
  if (["*", "error"].includes(e)) {
    let t = e === "*" ? "any" : e,
      n = `Using the "${e}" event with the regular Webhooks.on() function is not supported. Please use the Webhooks.on${
        t.charAt(0).toUpperCase() + t.slice(1)
      }() method instead`;
    throw new Error(n);
  }
  w.includes(e) ||
    r.log.warn(
      `"${e}" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)`
    ),
    m(r, e, o);
}
function k(r, e) {
  m(r, "*", e);
}
function j(r, e) {
  m(r, "error", e);
}
function y(r, e) {
  let o;
  try {
    o = r(e);
  } catch (t) {
    console.log('FATAL: Error occurred in "error" event handler'),
      console.log(t);
  }
  o &&
    o.catch &&
    o.catch((t) => {
      console.log('FATAL: Error occurred in "error" event handler'),
        console.log(t);
    });
}
function q(r, e, o) {
  let t = [r.hooks[o], r.hooks["*"]];
  return e && t.unshift(r.hooks[`${o}.${e}`]), [].concat(...t.filter(Boolean));
}
function E(r, e) {
  let o = r.hooks.error || [];
  if (e instanceof Error) {
    let s = Object.assign(new u([e]), { event: e });
    return o.forEach((i) => y(i, s)), Promise.reject(s);
  }
  if (!e || !e.name) throw new u(["Event name not passed"]);
  if (!e.payload) throw new u(["Event payload not passed"]);
  let t = q(r, "action" in e.payload ? e.payload.action : null, e.name);
  if (t.length === 0) return Promise.resolve();
  let n = [],
    l = t.map((s) => {
      let i = Promise.resolve(e);
      return (
        r.transform && (i = i.then(r.transform)),
        i.then((d) => s(d)).catch((d) => n.push(Object.assign(d, { event: e })))
      );
    });
  return Promise.all(l).then(() => {
    if (n.length === 0) return;
    let s = new u(n);
    throw (Object.assign(s, { event: e }), o.forEach((i) => y(i, s)), s);
  });
}
function f(r, e, o) {
  if (Array.isArray(e)) {
    e.forEach((t) => f(r, t, o));
    return;
  }
  if (r.hooks[e]) {
    for (let t = r.hooks[e].length - 1; t >= 0; t--)
      if (r.hooks[e][t] === o) {
        r.hooks[e].splice(t, 1);
        return;
      }
  }
}
function A(r) {
  let e = { hooks: {}, log: p(r && r.log) };
  return (
    r && r.transform && (e.transform = r.transform),
    {
      on: v.bind(null, e),
      onAny: k.bind(null, e),
      onError: j.bind(null, e),
      removeListener: f.bind(null, e),
      receive: E.bind(null, e),
    }
  );
}
async function L(r, e) {
  if (!(await z(r.secret, e.payload, e.signature).catch(() => !1))) {
    let n = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret"
    );
    return r.eventHandler.receive(Object.assign(n, { event: e, status: 400 }));
  }
  let t;
  try {
    t = JSON.parse(e.payload);
  } catch (n) {
    throw ((n.message = "Invalid JSON"), (n.status = 400), new $([n]));
  }
  return r.eventHandler.receive({ id: e.id, name: e.name, payload: t });
}
var R = ["x-github-event", "x-hub-signature-256", "x-github-delivery"];
function x(r) {
  return R.filter((e) => !(e in r.headers));
}
function T(r) {
  return "body" in r
    ? typeof r.body == "object" &&
      "rawBody" in r &&
      r.rawBody instanceof __Buffer$
      ? Promise.resolve(r.rawBody.toString("utf8"))
      : Promise.resolve(r.body)
    : new Promise((e, o) => {
        let t = [];
        r.on("error", (n) => o(new P([n]))),
          r.on("data", (n) => t.push(n)),
          r.on("end", () =>
            __setImmediate$(
              e,
              t.length === 1
                ? t[0].toString("utf8")
                : __Buffer$.concat(t).toString("utf8")
            )
          );
      });
}
function U(r, e) {
  e.writeHead(404, { "content-type": "application/json" }),
    e.end(JSON.stringify({ error: `Unknown route: ${r.method} ${r.url}` }));
}
async function B(r, e, o, t, n) {
  let l;
  try {
    l = new URL(o.url, "http://localhost").pathname;
  } catch {
    return (
      t.writeHead(422, { "content-type": "application/json" }),
      t.end(
        JSON.stringify({ error: `Request URL could not be parsed: ${o.url}` })
      ),
      !0
    );
  }
  if (l !== e.path) return n?.(), !1;
  if (o.method !== "POST") return U(o, t), !0;
  if (
    !o.headers["content-type"] ||
    !o.headers["content-type"].startsWith("application/json")
  )
    return (
      t.writeHead(415, {
        "content-type": "application/json",
        accept: "application/json",
      }),
      t.end(
        JSON.stringify({
          error:
            'Unsupported "Content-Type" header value. Must be "application/json"',
        })
      ),
      !0
    );
  let s = x(o).join(", ");
  if (s)
    return (
      t.writeHead(400, { "content-type": "application/json" }),
      t.end(JSON.stringify({ error: `Required headers missing: ${s}` })),
      !0
    );
  let i = o.headers["x-github-event"],
    d = o.headers["x-hub-signature-256"],
    h = o.headers["x-github-delivery"];
  e.log.debug(`${i} event received (id: ${h})`);
  let _ = !1,
    g = setTimeout(() => {
      (_ = !0),
        (t.statusCode = 202),
        t.end(`still processing
`);
    }, 9e3).unref();
  try {
    let a = await T(o);
    return (
      await r.verifyAndReceive({ id: h, name: i, payload: a, signature: d }),
      clearTimeout(g),
      _ ||
        t.end(`ok
`),
      !0
    );
  } catch (a) {
    if ((clearTimeout(g), _)) return !0;
    let c = Array.from(a.errors)[0],
      b = c.message
        ? `${c.name}: ${c.message}`
        : "Error: An Unspecified error occurred";
    return (
      (t.statusCode = typeof c.status < "u" ? c.status : 500),
      e.log.error(a),
      t.end(JSON.stringify({ error: b })),
      !0
    );
  }
}
function D(r, { path: e = "/api/github/webhooks", log: o = p() } = {}) {
  return B.bind(null, r, { path: e, log: o });
}
var F = class {
  sign;
  verify;
  on;
  onAny;
  onError;
  removeListener;
  receive;
  verifyAndReceive;
  constructor(r) {
    if (!r || !r.secret)
      throw new Error("[@octokit/webhooks] options.secret required");
    let e = { eventHandler: A(r), secret: r.secret, hooks: {}, log: p(r.log) };
    (this.sign = H.bind(null, r.secret)),
      (this.verify = S.bind(null, r.secret)),
      (this.on = e.eventHandler.on),
      (this.onAny = e.eventHandler.onAny),
      (this.onError = e.eventHandler.onError),
      (this.removeListener = e.eventHandler.removeListener),
      (this.receive = e.eventHandler.receive),
      (this.verifyAndReceive = L.bind(null, e));
  }
};
export {
  F as Webhooks,
  A as createEventHandler,
  D as createNodeMiddleware,
  w as emitterEventNames,
};
//# sourceMappingURL=webhooks.mjs.map
