/*
 * Ceramicadecor attribution tracker.
 *
 * Responsibilities:
 * - read UTM/click identifiers from the current URL;
 * - persist attribution for direct-return visits;
 * - add attribution hidden fields to forms;
 * - optionally submit marked forms to the shared CRM endpoint.
 *
 * Install:
 *   window.CD_ATTRIBUTION_CONFIG = { dryRun: true };
 *   <script src="/path/to/cd-attribution.js" defer></script>
 *
 * To let this script submit a form to CRM, add:
 *   <form data-cd-external-lead="1">...</form>
 */
(function (window, document) {
  "use strict";

  var DEFAULT_CONFIG = {
    endpoint: "https://ceramicadecor.ru/feedback/external_lead",
    dryRun: false,
    storageKey: "cd_attribution_v1",
    storageTtlDays: 180,
    transport: "form",
    autoDecorateForms: true,
    autoBindExternalLeadForms: true,
    yandexMetrikaCounterId: null,
    trackingParamsToStrip: [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "fbclid",
      "gclid",
      "yclid",
      "ysclid",
      "_openstat"
    ],
    siteRules: [
      { host: "ceramicadecor.kz", siteKey: "ceramicadecor_kz", countryCode: "KZ" },
      { host: "ceramicadecor.by", siteKey: "ceramicadecor_by", countryCode: "BY" },
      { host: "ceramicadecor.de", siteKey: "ceramicadecor_de", countryCode: "DE" },
      { host: "ceramicadecor.ru", siteKey: "ceramicadecor_ru", countryCode: "RU" },
      { hostSuffix: ".ceramicadecor.ru", siteKey: "ceramicadecor_ru", countryCode: "RU" },
      {
        host: "ceramicadecor.pro",
        pathPrefix: "/barbekyu",
        siteKey: "ceramicadecor_pro_barbekyu",
        countryCode: "RU"
      },
      { host: "ceramicadecor.pro", siteKey: "ceramicadecor_pro", countryCode: "RU" },
      { host: "ceramica-decor.ru", siteKey: "ceramica_decor_ru", countryCode: "RU" },
      { host: "ceramicahearth.online", siteKey: "ceramicahearth_online", countryCode: "RU" }
    ]
  };

  var config = merge(DEFAULT_CONFIG, window.CD_ATTRIBUTION_CONFIG || {});
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var CLICK_ID_KEYS = ["fbclid", "gclid", "yclid"];

  function merge(base, override) {
    var result = {};
    Object.keys(base).forEach(function (key) {
      result[key] = base[key];
    });
    Object.keys(override || {}).forEach(function (key) {
      result[key] = override[key];
    });
    return result;
  }

  function nowIsoWithOffset() {
    var date = new Date();
    var offsetMinutes = -date.getTimezoneOffset();
    var sign = offsetMinutes >= 0 ? "+" : "-";
    var abs = Math.abs(offsetMinutes);
    var hh = pad(Math.floor(abs / 60));
    var mm = pad(abs % 60);

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      sign +
      hh +
      ":" +
      mm
    );
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function getUrl() {
    return new URL(window.location.href);
  }

  function normalizeHost(hostname) {
    return String(hostname || "").replace(/^www\./, "").toLowerCase();
  }

  function getCurrentSite() {
    var url = getUrl();
    var host = normalizeHost(url.hostname);
    var path = normalizePath(url.pathname);

    for (var i = 0; i < config.siteRules.length; i += 1) {
      var rule = config.siteRules[i];
      var ruleHost = normalizeHost(rule.host);
      var hostMatches = false;

      if (rule.host && host === ruleHost) {
        hostMatches = true;
      }

      if (rule.hostSuffix && host.endsWith(rule.hostSuffix)) {
        hostMatches = true;
      }

      if (!hostMatches) {
        continue;
      }

      if (rule.pathPrefix && !path.startsWith(normalizePath(rule.pathPrefix))) {
        continue;
      }

      return {
        site_key: rule.siteKey,
        country_code: rule.countryCode
      };
    }

    return {
      site_key: config.siteKey || "",
      country_code: config.countryCode || ""
    };
  }

  function normalizePath(path) {
    var normalized = "/" + String(path || "").replace(/^\/+/, "");
    return normalized.replace(/\/+$/, "") || "/";
  }

  function getParam(params, key) {
    return params.get(key) || params.get(key.toUpperCase()) || "";
  }

  function readUrlAttribution() {
    var url = getUrl();
    var params = url.searchParams;
    var result = {};

    UTM_KEYS.forEach(function (key) {
      result[key] = getParam(params, key);
    });

    CLICK_ID_KEYS.forEach(function (key) {
      result[key] = getParam(params, key);
    });

    result.referrer = document.referrer || "";
    result.landing_page_full = window.location.href;
    result.landing_page_clean = cleanUrl(window.location.href);
    result.current_page_full = window.location.href;
    result.current_page_clean = cleanUrl(window.location.href);
    result.ym_client_id = getYmClientId();

    return result;
  }

  function cleanUrl(urlValue) {
    try {
      var url = new URL(urlValue, window.location.origin);
      config.trackingParamsToStrip.forEach(function (param) {
        url.searchParams.delete(param);
        url.searchParams.delete(param.toUpperCase());
      });

      var query = url.searchParams.toString();
      return url.origin + url.pathname + (query ? "?" + query : "") + url.hash;
    } catch (error) {
      return urlValue || "";
    }
  }

  function getCookie(name) {
    var escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var match = document.cookie.match(new RegExp("(?:^|; )" + escapedName + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : "";
  }

  function getYmClientId() {
    var cookieValue = getCookie("_ym_uid");
    if (cookieValue) {
      return cookieValue;
    }

    return "";
  }

  function requestYmClientId(callback) {
    if (!config.yandexMetrikaCounterId || typeof window.ym !== "function") {
      callback(getYmClientId());
      return;
    }

    try {
      window.ym(config.yandexMetrikaCounterId, "getClientID", function (clientId) {
        callback(clientId || getYmClientId());
      });
    } catch (error) {
      callback(getYmClientId());
    }
  }

  function isExternalReferrer(referrer) {
    if (!referrer) {
      return false;
    }

    try {
      var referrerUrl = new URL(referrer);
      return normalizeHost(referrerUrl.hostname) !== normalizeHost(window.location.hostname);
    } catch (error) {
      return false;
    }
  }

  function hasAny(values, keys) {
    return keys.some(function (key) {
      return Boolean(values[key]);
    });
  }

  function isNonDirectVisit(values) {
    return hasAny(values, UTM_KEYS) || hasAny(values, CLICK_ID_KEYS) || isExternalReferrer(values.referrer);
  }

  function loadStoredAttribution() {
    try {
      var raw = window.localStorage.getItem(config.storageKey);
      if (!raw) {
        return null;
      }

      var data = JSON.parse(raw);
      if (!data.expires_at || Date.now() > data.expires_at) {
        window.localStorage.removeItem(config.storageKey);
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  function saveStoredAttribution(data) {
    try {
      window.localStorage.setItem(config.storageKey, JSON.stringify(data));
    } catch (error) {
      // Storage can be blocked. The script still works for the current page.
    }
  }

  function updateStoredAttribution() {
    var current = readUrlAttribution();
    var stored = loadStoredAttribution();
    var now = nowIsoWithOffset();
    var ttlMs = config.storageTtlDays * 24 * 60 * 60 * 1000;

    if (!stored) {
      stored = {
        first_visit_at: now,
        first_referrer: current.referrer || "",
        first_landing_page_full: current.landing_page_full,
        first_landing_page_clean: current.landing_page_clean
      };
    }

    stored.expires_at = Date.now() + ttlMs;

    if (isNonDirectVisit(current)) {
      stored.last_non_direct_visit_at = now;
      stored.last_non_direct_referrer = current.referrer || "";
      stored.last_non_direct_landing_page_full = current.landing_page_full;
      stored.last_non_direct_landing_page_clean = current.landing_page_clean;

      UTM_KEYS.concat(CLICK_ID_KEYS).forEach(function (key) {
        stored[key] = current[key] || "";
      });
    } else if (!stored.last_non_direct_visit_at) {
      UTM_KEYS.concat(CLICK_ID_KEYS).forEach(function (key) {
        stored[key] = stored[key] || "";
      });
    }

    if (current.ym_client_id) {
      stored.ym_client_id = current.ym_client_id;
    }

    saveStoredAttribution(stored);

    requestYmClientId(function (clientId) {
      if (!clientId) {
        return;
      }
      var latest = loadStoredAttribution() || stored;
      latest.ym_client_id = clientId;
      saveStoredAttribution(latest);
    });

    return stored;
  }

  function getAttributionPayload(overrides) {
    var current = readUrlAttribution();
    var stored = loadStoredAttribution() || updateStoredAttribution() || {};
    var site = getCurrentSite();
    var useStoredAttribution = !hasAny(current, UTM_KEYS.concat(CLICK_ID_KEYS));
    var payload = {};

    payload.site_key = site.site_key;
    payload.country_code = site.country_code;
    payload.contact_method = "website_form";

    payload.referrer = stored.last_non_direct_referrer || stored.first_referrer || current.referrer || "";
    payload.landing_page_full =
      stored.last_non_direct_landing_page_full || stored.first_landing_page_full || current.landing_page_full;
    payload.current_page_full = current.current_page_full;

    UTM_KEYS.concat(CLICK_ID_KEYS).forEach(function (key) {
      payload[key] = useStoredAttribution ? stored[key] || "" : current[key] || "";
    });

    payload.ym_client_id = stored.ym_client_id || current.ym_client_id || "";
    payload.first_visit_at = stored.first_visit_at || "";
    payload.last_non_direct_visit_at = stored.last_non_direct_visit_at || "";

    Object.keys(overrides || {}).forEach(function (key) {
      if (overrides[key] !== undefined && overrides[key] !== null) {
        payload[key] = overrides[key];
      }
    });

    return payload;
  }

  function findField(form, names) {
    for (var i = 0; i < names.length; i += 1) {
      var selector = '[name="' + names[i] + '"], [data-cd-field="' + names[i] + '"]';
      var field = form.querySelector(selector);
      if (field) {
        return field;
      }
    }
    return null;
  }

  function getFieldValue(form, names) {
    var field = findField(form, names);
    return field ? String(field.value || "").trim() : "";
  }

  function collectLeadFields(form) {
    return {
      subject: form.getAttribute("data-cd-subject") || getFieldValue(form, ["subject", "theme"]) || "Запрос обратного звонка",
      name: getFieldValue(form, ["name", "client_name", "fio", "username"]),
      email: getFieldValue(form, ["email", "mail", "client_email"]),
      phone: getFieldValue(form, ["phone", "tel", "telephone", "client_phone"]),
      comment: getFieldValue(form, ["comment", "message", "text", "question"]),
      contact_method: form.getAttribute("data-cd-contact-method") || "website_form"
    };
  }

  function addHiddenField(form, name, value) {
    var field = form.querySelector('input[type="hidden"][name="' + name + '"]');
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.appendChild(field);
    }
    field.value = value == null ? "" : String(value);
  }

  function decorateForm(form) {
    var payload = getAttributionPayload({
      contact_method: form.getAttribute("data-cd-contact-method") || "website_form"
    });

    Object.keys(payload).forEach(function (key) {
      addHiddenField(form, key, payload[key]);
    });
  }

  function decorateForms(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("form"), decorateForm);
  }

  function submitLeadByForm(payload, useDryRun) {
    return new Promise(function (resolve) {
      var frameName = "cd_attribution_frame_" + Date.now() + "_" + Math.random().toString(36).slice(2);
      var iframe = document.createElement("iframe");
      var form = document.createElement("form");
      var submitted = false;

      iframe.name = frameName;
      iframe.style.display = "none";
      form.method = "POST";
      form.action = config.endpoint;
      form.target = frameName;
      form.style.display = "none";

      Object.keys(payload).forEach(function (key) {
        var value = payload[key];
        if (value === undefined || value === null) {
          return;
        }
        var field = document.createElement("input");
        field.type = "hidden";
        field.name = key;
        field.value = String(value);
        form.appendChild(field);
      });

      if (useDryRun) {
        var dryRunField = document.createElement("input");
        dryRunField.type = "hidden";
        dryRunField.name = "dry_run";
        dryRunField.value = "1";
        form.appendChild(dryRunField);
      }

      iframe.addEventListener("load", function () {
        if (submitted) {
          resolve({ ok: true, transport: "form" });
        }
      });

      document.body.appendChild(iframe);
      document.body.appendChild(form);
      submitted = true;
      form.submit();

      window.setTimeout(function () {
        if (form.parentNode) form.parentNode.removeChild(form);
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        resolve({ ok: true, transport: "form", status: "submitted" });
      }, 3500);
    });
  }

  function submitLead(leadFields, options) {
    var requestOptions = options || {};
    var payload = getAttributionPayload(leadFields || {});
    var body = new URLSearchParams();

    Object.keys(payload).forEach(function (key) {
      var value = payload[key];
      if (value !== undefined && value !== null) {
        body.append(key, value);
      }
    });

    var useDryRun =
      typeof requestOptions.dryRun === "boolean" ? requestOptions.dryRun : Boolean(config.dryRun);

    if (useDryRun) {
      body.append("dry_run", "1");
    }

    if (config.transport === "form" || requestOptions.transport === "form") {
      return submitLeadByForm(payload, useDryRun);
    }

    return window
      .fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("[" + response.status + "] CRM request failed: " + response.statusText);
        }
        return response.json();
      });
  }

  function bindExternalLeadForms(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('form[data-cd-external-lead="1"]'), function (form) {
      if (form.__cdAttributionBound) {
        return;
      }

      form.__cdAttributionBound = true;
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        decorateForm(form);

        submitLead(collectLeadFields(form))
          .then(function (data) {
            var customEvent = new CustomEvent("cd:lead-success", {
              bubbles: true,
              detail: data
            });
            form.dispatchEvent(customEvent);
          })
          .catch(function (error) {
            var customEvent = new CustomEvent("cd:lead-error", {
              bubbles: true,
              detail: error
            });
            form.dispatchEvent(customEvent);
          });
      });
    });
  }

  function init() {
    updateStoredAttribution();

    if (config.autoDecorateForms) {
      decorateForms(document);
      document.addEventListener(
        "submit",
        function (event) {
          if (event.target && event.target.tagName === "FORM") {
            decorateForm(event.target);
          }
        },
        true
      );
    }

    if (config.autoBindExternalLeadForms) {
      bindExternalLeadForms(document);
    }
  }

  window.CDAttribution = {
    init: init,
    getPayload: getAttributionPayload,
    decorateForm: decorateForm,
    decorateForms: decorateForms,
    submitLead: submitLead,
    bindExternalLeadForms: bindExternalLeadForms,
    cleanUrl: cleanUrl,
    config: config
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);
