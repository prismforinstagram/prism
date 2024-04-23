import { API_URL, defaultHeaders, uuid, phoneId, deviceId, adid } from './config'
import crypto from 'react-native-quick-crypto'

const signature = (data: string) => {
  return crypto.createHmac('sha256', '9193488027538fd3450b83b7d05286d4ca9599a0f7eeed90d8c85925698a05dc')
      .update(data)
      .digest('hex');
}

const qeSync = async () => {
  const params = {
    id: uuid,
    experiments: "ig_android_fci_onboarding_friend_search,ig_android_device_detection_info_upload,ig_android_account_linking_upsell_universe,ig_android_direct_main_tab_universe_v2,ig_android_allow_account_switch_once_media_upload_finish_universe,ig_android_sign_in_help_only_one_account_family_universe,ig_android_sms_retriever_backtest_universe,ig_android_direct_add_direct_to_android_native_photo_share_sheet,ig_android_spatial_account_switch_universe,ig_growth_android_profile_pic_prefill_with_fb_pic_2,ig_account_identity_logged_out_signals_global_holdout_universe,ig_android_prefill_main_account_username_on_login_screen_universe,ig_android_login_identifier_fuzzy_match,ig_android_mas_remove_close_friends_entrypoint,ig_android_shared_email_reg_universe,ig_android_video_render_codec_low_memory_gc,ig_android_custom_transitions_universe,ig_android_push_fcm,multiple_account_recovery_universe,ig_android_show_login_info_reminder_universe,ig_android_email_fuzzy_matching_universe,ig_android_one_tap_aymh_redesign_universe,ig_android_direct_send_like_from_notification,ig_android_suma_landing_page,ig_android_prefetch_debug_dialog,ig_android_smartlock_hints_universe,ig_android_black_out,ig_activation_global_discretionary_sms_holdout,ig_android_video_ffmpegutil_pts_fix,ig_android_multi_tap_login_new,ig_save_smartlock_universe,ig_android_caption_typeahead_fix_on_o_universe,ig_android_enable_keyboardlistener_redesign,ig_android_sign_in_password_visibility_universe,ig_android_nux_add_email_device,ig_android_direct_remove_view_mode_stickiness_universe,ig_android_hide_contacts_list_in_nux,ig_android_new_users_one_tap_holdout_universe,ig_android_ingestion_video_support_hevc_decoding,ig_android_mas_notification_badging_universe,ig_android_secondary_account_in_main_reg_flow_universe,ig_android_secondary_account_creation_universe,ig_android_account_recovery_auto_login,ig_android_pwd_encrytpion,ig_android_bottom_sheet_keyboard_leaks,ig_android_sim_info_upload,ig_android_mobile_http_flow_device_universe,ig_android_hide_fb_button_when_not_installed_universe,ig_android_account_linking_on_concurrent_user_session_infra_universe,ig_android_targeted_one_tap_upsell_universe,ig_android_gmail_oauth_in_reg,ig_android_account_linking_flow_shorten_universe,ig_android_vc_interop_use_test_igid_universe,ig_android_notification_unpack_universe,ig_android_registration_confirmation_code_universe,ig_android_device_based_country_verification,ig_android_log_suggested_users_cache_on_error,ig_android_reg_modularization_universe,ig_android_device_verification_separate_endpoint,ig_android_universe_noticiation_channels,ig_android_account_linking_universe,ig_android_hsite_prefill_new_carrier,ig_android_one_login_toast_universe,ig_android_retry_create_account_universe,ig_android_family_apps_user_values_provider_universe,ig_android_reg_nux_headers_cleanup_universe,ig_android_mas_ui_polish_universe,ig_android_device_info_foreground_reporting,ig_android_shortcuts_2019,ig_android_device_verification_fb_signup,ig_android_onetaplogin_optimization,ig_android_passwordless_account_password_creation_universe,ig_android_black_out_toggle_universe,ig_video_debug_overlay,ig_android_ask_for_permissions_on_reg,ig_assisted_login_universe,ig_android_security_intent_switchoff,ig_android_device_info_job_based_reporting,ig_android_add_account_button_in_profile_mas_universe,ig_android_add_dialog_when_delinking_from_child_account_universe,ig_android_passwordless_auth,ig_radio_button_universe_2,ig_android_direct_main_tab_account_switch,ig_android_recovery_one_tap_holdout_universe,ig_android_modularized_dynamic_nux_universe,ig_android_fb_account_linking_sampling_freq_universe,ig_android_fix_sms_read_lollipop,ig_android_access_flow_prefil"
  }
  const json = JSON.stringify(params)
  const form = {
    ig_sig_key_version: '4',
    signed_body: `${signature(json)}.${json}`,
  }
  const headers = {
      ...defaultHeaders,
      'X-DEVICE-ID': uuid,
      'Content-Type': 'application/x-www-form-urlencoded'
  }

  const res = await fetch(`${API_URL}/api/v1/qe/sync/`, {
    method: 'POST',
    headers,
    body: new URLSearchParams(form).toString(),
  })
  if (res.status !== 200) {
    throw new Error('Error during the QE process')
  }
  return res
}

const encryptPassword = async (password: string) => {
  // https://github.com/dilame/instagram-private-api/blob/master/src/repositories/account.repository.ts#L79-L103
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  let keyId;
  let pubKey;
  let mid;
  let cookies;
  let csrfToken;
  await qeSync().then(async res => {
    const headers = res.headers;
    keyId = headers.get('ig-set-password-encryption-key-id');
    pubKey = headers.get('ig-set-password-encryption-pub-key');
    cookies = headers.get('set-cookie')?.split(';');
    csrfToken = cookies?.find(cookie => cookie.startsWith('csrftoken'))!.split('=')[1]
    mid = 'Zib2vgALAAFJg4nhTacpHYf51qbq'
  });
  const rsaEncrypted = crypto.publicEncrypt({
    // @ts-ignore
    key: Buffer.from(pubKey, 'base64').toString(),
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }, key);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16
  });
  const time = Math.floor(Date.now() / 1000).toString();
  cipher.setAAD(Buffer.from(time));
  const aesEncrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
  const sizeBuffer = Buffer.alloc(2, 0);
  sizeBuffer.writeInt16LE(rsaEncrypted.byteLength, 0);
  const authTag = Buffer.from(cipher.getAuthTag());
  return {
    time,
    encrypted: Buffer.concat([
        // @ts-ignore
        Buffer.from([1, keyId]),
        iv,
        sizeBuffer,
        rsaEncrypted,
        authTag,
        aesEncrypted
      ]).toString('base64'),
    csrfToken,
    mid
  };
}

const createJazoest = (input: string) => {
  const buf = Buffer.from(input, 'ascii');
  let sum = 0;
  for (let i = 0; i < buf.byteLength; i++) {
    sum += buf.readUInt8(i);
  }
  return `2${sum}`;
}

export const login = async (username: string, password: string) => {
  const encryptedPassword = await encryptPassword(password);

  const params = {
    username,
    enc_password: `#PWD_INSTAGRAM:4:${encryptedPassword.time}:${encryptedPassword.encrypted}`,
    guid: uuid,
    phone_id: phoneId,
    _csrftoken: 'missing',
    device_id: deviceId,
    adid,
    google_tokens: '[]',
    login_attempt_count: 0,
    country_codes: JSON.stringify([{ country_code: '1', source: 'default' }]),
    jazoest: createJazoest(phoneId),
  }
  const json = JSON.stringify(params)
  const form = {
    ig_sig_key_version: '4',
    signed_body: `${signature(json)}.${json}`,
  }

  const res = await fetch(`${API_URL}/api/v1/accounts/login/`, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      'Content-Type': 'application/json',
      'X-MID': encryptedPassword.mid!,
    },
    body: new URLSearchParams(form).toString(),
  })
  if (res.status !== 200) {
    throw new Error('Error during the login process')
  }
  const text = await res.text()
  const pos = text.search('Bearer IGT:2:')
  const sliced = text.substring(pos)
  const token = sliced.substring(13, sliced.search(/\\\*?/gm))
  return token
}
