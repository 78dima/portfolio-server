import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard([
    Markup.button.callback('✉️ Show all messages', 'list'),
  ]);
}
