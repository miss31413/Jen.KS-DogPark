# Charity Web Builder Skill

這是一個專門為「高雄張阿姨狗園」及類似公益組織設計的開發 Skill。它確保網站具備活潑的動態效果、溫暖的視覺感受，以及一致的語意化結構。

## 視覺規範 (Visual Guidelines)

### 配色方案 (Color Palette)
- **Primary (溫暖橘):** `#FF8C42` - 用於核心 CTA 與強調。
- **Secondary (土黃/沙色):** `#F9C784` - 用於背景裝飾與次要元件。
- **Accent (希望綠):** `#4CAF50` - 用於「已達成」及捐款成功提示。
- **Background (純淨白/淺灰):** `#FCFCFC` / `#F3F3F3`。

### 字體規範 (Typography)
- **標題:** 圓潤、具親和力的無襯線字體 (如: Inter, Noto Sans TC)。
- **內文:** 易讀性高的字體高度。

## 動態標準 (Animation Standards)

1.  **捲動露出 (Scroll Reveal):** 所有區塊進入視窗時需有 `fade-in-up` 效果。
2.  **懸停互動 (Hover Effects):**
    - 卡片需有微幅上浮與陰影加深。
    - 按鈕需有平滑的顏色漸變或縮放。
3.  **數字跳動 (Counter Animation):** 影響力數字必須具備從 0 增加的動態。

## 元件規範 (Component Structures)

### 1. 浪浪故事卡片 (.dog-card)
```html
<div class="dog-card">
  <img src="path/to/dog.jpg" alt="狗狗名字">
  <div class="info">
    <h3>狗狗名字</h3>
    <p>故事簡述...</p>
    <button class="btn-primary">幫助牠</button>
  </div>
</div>
```

### 2. 行動呼籲按鈕 (.btn-cta)
- 必須醒目，通常帶有漸層色。

## 自動化指令 (Automation Instructions)

當使用者要求新增功能時，請遵循以下邏輯：
- **HTML:** 保持語意化，使用具意義的 Class Name。
- **CSS:** 使用 CSS 變數 (`--primary-color`) 以確保一致性。
- **JS (Vanilla):** 優先使用原生 API 實作動態。
