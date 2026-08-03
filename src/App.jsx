import { useMemo, useState } from "react";

const regions = [
  ["IN", "印度", "Chandra Dragon"],
  ["PK", "巴基斯坦", "Moon Dragon"],
  ["ID", "印尼", "Naga Bulan"],
  ["BD", "孟加拉", "চন্দ্র ড্রাগন"],
  ["PH", "菲律宾", "Moon Dragon"],
  ["AR", "阿拉伯", "تنين القمر"],
  ["TR", "土耳其", "Ay Ejderhası"],
  ["BR", "巴西", "Dragão Lunar"],
];

const pets = [
  {
    id: "PET-001",
    name: "月曜龙",
    grade: "SS",
    cover: "moon-dragon-cover.webp",
    resource: "6/6",
    external: "2/2",
    updated: "2026-07-30 18:42",
  },
  {
    id: "PET-002",
    name: "潮汐鲸",
    grade: "S",
    cover: "tide-whale-cover.webp",
    resource: "4/6",
    external: "1/2",
    updated: "2026-07-29 16:15",
  },
  {
    id: "PET-003",
    name: "棉云兔",
    grade: "A",
    cover: "cloud-rabbit-cover.webp",
    resource: "6/6",
    external: "2/2",
    updated: "2026-07-25 10:08",
  },
  {
    id: "PET-004",
    name: "曜金狮",
    grade: "SSS",
    cover: "gold-lion-cover.webp",
    resource: "2/6",
    external: "0/2",
    updated: "2026-07-22 21:30",
  },
];

const eggs = [
  {
    id: "EGG-SS-001",
    grade: "SS",
    cover: "pet-egg-ss.webp",
    petIds: ["PET-001", "PET-002"],
    pets: "月曜龙、潮汐鲸",
    petCount: 2,
    updated: "2026-07-30 18:55",
  },
  {
    id: "EGG-S-001",
    grade: "S",
    cover: "pet-egg-s.webp",
    petIds: ["PET-002", "PET-003"],
    pets: "潮汐鲸、棉云兔",
    petCount: 2,
    updated: "2026-07-28 14:20",
  },
  {
    id: "EGG-SSS-001",
    grade: "SSS",
    cover: "pet-egg-sss.webp",
    petIds: ["PET-004"],
    pets: "曜金狮",
    petCount: 1,
    updated: "2026-07-26 11:10",
  },
];

const formResources = [
  {
    star: "一星",
    level: "初始形态",
    idle: "moon-1-idle.webp",
    interact: "moon-1-interact.mp4",
  },
  {
    star: "二星",
    level: "30",
    idle: "moon-2-idle.webp",
    interact: "moon-2-interact.mp4",
  },
  {
    star: "三星",
    level: "50",
    idle: "moon-3-idle.webp",
    interact: "moon-3-interact.mp4",
  },
];

function generateEggId(grade) {
  const prefix = `EGG-${grade}-`;
  const nextSequence =
    eggs.reduce((max, item) => {
      if (!item.id.startsWith(prefix)) return max;
      const sequence = Number(item.id.slice(prefix.length));
      return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
    }, 0) + 1;
  return `${prefix}${String(nextSequence).padStart(3, "0")}`;
}

function UploadField({ title, file, accept = "WebP / MP4" }) {
  const [fileName, setFileName] = useState(file);
  return (
    <label className="upload-field">
      <span className="upload-title">{title}</span>
      <span className="upload-file">{fileName || "点击上传资源"}</span>
      <span className="upload-meta">
        支持 {accept} · 尺寸与文件大小待确认
      </span>
      <input
        type="file"
        accept=".webp,.mp4"
        onChange={(event) =>
          setFileName(event.target.files?.[0]?.name || fileName)
        }
      />
    </label>
  );
}

function PetDrawer({ mode, pet, onClose, onSaved }) {
  const [section, setSection] = useState("base");
  const [name, setName] = useState(pet?.name || "");
  const [grade, setGrade] = useState(pet?.grade || "S");
  const [localNames, setLocalNames] = useState(
    Object.fromEntries(regions.map(([code, , value]) => [code, value])),
  );
  const [error, setError] = useState("");

  const save = () => {
    if (!name.trim()) {
      setSection("base");
      setError("请填写宠物名称");
      return;
    }
    if (Object.values(localNames).some((value) => !value.trim())) {
      setSection("locale");
      setError("请补全全部用户区域的宠物名称");
      return;
    }
    setError("");
    onSaved(mode === "create" ? "宠物已创建并保存" : "宠物配置已保存");
  };

  return (
    <>
      <div className="mask" onClick={onClose} />
      <aside className="drawer" aria-label="宠物编辑抽屉">
        <header className="drawer-head">
          <div>
            <p className="eyebrow">{mode === "create" ? "新建宠物" : pet.id}</p>
            <h2>{mode === "create" ? "新建宠物配置" : `编辑 ${pet.name}`}</h2>
            <p>未保存修改离开时需要二次确认</p>
          </div>
          <button className="text-btn" onClick={onClose}>
            关闭
          </button>
        </header>

        <nav className="drawer-tabs" aria-label="配置分组">
          {[
            ["base", "基础信息"],
            ["locale", "多语言名称"],
            ["forms", "形态资源"],
            ["external", "外部展示"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={section === key ? "active" : ""}
              onClick={() => setSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="drawer-body">
          {section === "base" && (
            <section className="form-section">
              <div className="section-title">
                <h3>基础信息</h3>
                <p>用于宠物列表、图册和客户端基础信息展示。</p>
              </div>
              <div className="form-grid">
                <UploadField
                  title="宠物封面 *"
                  file={pet?.cover || ""}
                  accept="WebP"
                />
                <div className="field">
                  <label htmlFor="pet-name">宠物名称 *</label>
                  <input
                    id="pet-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="请输入默认宠物名称"
                  />
                  <small>默认名称用于后台识别；客户端按用户区域读取多语言名称。</small>
                </div>
                <div className="field half-field">
                  <label htmlFor="pet-grade">宠物品级 *</label>
                  <select
                    id="pet-grade"
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                  >
                    <option>A</option>
                    <option>S</option>
                    <option>SS</option>
                    <option>SSS</option>
                  </select>
                </div>
                <div className="impact-note">
                  品级变更会影响宠物蛋关联和客户端品级展示，保存前请确认影响范围。
                </div>
              </div>
            </section>
          )}

          {section === "locale" && (
            <section className="form-section">
              <div className="section-title">
                <h3>多语言名称</h3>
                <p>按用户区域配置名称；缺失时保存会提示补充。</p>
              </div>
              <div className="locale-list">
                {regions.map(([code, region]) => (
                  <div className="locale-row" key={code}>
                    <span className="region-code">{code}</span>
                    <label htmlFor={`locale-${code}`}>{region}</label>
                    <input
                      id={`locale-${code}`}
                      value={localNames[code]}
                      onChange={(event) =>
                        setLocalNames({
                          ...localNames,
                          [code]: event.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {section === "forms" && (
            <section className="form-section">
              <div className="section-title">
                <h3>三星形态资源</h3>
                <p>
                  形态按进化等级解锁；等级需递增且不得超过宠物等级上限 100。
                </p>
              </div>
              <div className="form-resource-list">
                {formResources.map((item, index) => (
                  <article className="form-resource" key={item.star}>
                    <div className="form-resource-head">
                      <div>
                        <strong>{item.star}形态</strong>
                        <span>{index === 0 ? "初始展示" : "达到等级后解锁"}</span>
                      </div>
                      <div className="level-input">
                        <label htmlFor={`level-${index}`}>进化等级</label>
                        <input
                          id={`level-${index}`}
                          defaultValue={item.level}
                          disabled={index === 0}
                        />
                      </div>
                    </div>
                    <div className="resource-grid">
                      <UploadField title="待机形态资源 *" file={item.idle} />
                      <UploadField
                        title="互动形态资源 *"
                        file={item.interact}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {section === "external" && (
            <section className="form-section">
              <div className="section-title">
                <h3>外部展示资源</h3>
                <p>独立管理宠物在个人主页和资料卡片中的展示资源。</p>
              </div>
              <div className="external-grid">
                <UploadField
                  title="个人主页展示资源 *"
                  file="moon-profile-home.webp"
                />
                <UploadField
                  title="资料卡片展示资源 *"
                  file="moon-profile-card.webp"
                />
              </div>
              <div className="validation-panel">
                <div>
                  <strong>完整性校验</strong>
                  <p>基础信息、多语言名称、6 个形态资源、2 个外部展示资源。</p>
                </div>
                <span className="validation-ok">当前配置完整</span>
              </div>
            </section>
          )}

          {error && <div className="form-error">{error}</div>}
        </div>

        <footer className="drawer-foot">
          <span>保存后将更新宠物配置</span>
          <div>
            <button className="btn" onClick={onClose}>
              取消
            </button>
            <button className="btn primary" onClick={save}>
              保存配置
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}

function EggDrawer({ egg, mode, onClose, onSaved }) {
  const [grade, setGrade] = useState(egg?.grade || "S");
  const [selectedPetIds, setSelectedPetIds] = useState(
    new Set(egg?.petIds || []),
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerKeyword, setPickerKeyword] = useState("");
  const [pickerGrade, setPickerGrade] = useState("全部");
  const [pendingPetIds, setPendingPetIds] = useState(new Set());
  const [error, setError] = useState("");
  const eggId = egg?.id || generateEggId(grade);

  const selectedPetItems = pets.filter((item) => selectedPetIds.has(item.id));
  const filteredPickerPets = pets.filter(
    (item) =>
      (!pickerKeyword ||
        `${item.id}${item.name}${item.cover}`
          .toLowerCase()
          .includes(pickerKeyword.toLowerCase())) &&
      (pickerGrade === "全部" || item.grade === pickerGrade),
  );

  const openPicker = () => {
    setPickerKeyword("");
    setPickerGrade("全部");
    setPendingPetIds(new Set());
    setPickerOpen(true);
  };

  const togglePendingPet = (petId) => {
    const next = new Set(pendingPetIds);
    if (next.has(petId)) next.delete(petId);
    else next.add(petId);
    setPendingPetIds(next);
  };

  const bindPets = () => {
    setSelectedPetIds(
      new Set([...selectedPetIds, ...Array.from(pendingPetIds)]),
    );
    setPickerOpen(false);
    setPendingPetIds(new Set());
    setError("");
  };

  const removePet = (petId) => {
    const next = new Set(selectedPetIds);
    next.delete(petId);
    setSelectedPetIds(next);
  };

  const save = () => {
    if (!selectedPetIds.size) {
      setError("至少关联 1 个已配置宠物");
      return;
    }
    onSaved(
      mode === "create"
        ? `宠物蛋已创建，ID：${eggId}`
        : "宠物蛋配置已保存",
    );
  };

  return (
    <>
      <div className="mask" onClick={onClose} />
      <aside className="drawer egg-drawer" aria-label="宠物蛋编辑抽屉">
        <header className="drawer-head">
          <div>
            <p className="eyebrow">
              {mode === "create" ? "NEW PET EGG" : "PET EGG"}
            </p>
            <h2>{mode === "create" ? "新建宠物蛋配置" : "编辑宠物蛋配置"}</h2>
            <p>配置封面、品级和可随机孵化的宠物池。</p>
          </div>
          <button className="text-btn" onClick={onClose}>
            关闭
          </button>
        </header>
        <div className="drawer-body">
          <section className="form-section">
            <div className="section-title">
              <h3>基础信息</h3>
              <p>宠物蛋封面仅支持 WebP。</p>
            </div>
            <div className="form-grid">
              <UploadField
                title="宠物蛋封面 *"
                file={egg?.cover || ""}
                accept="WebP"
              />
              <div className="field half-field">
                <label htmlFor="egg-grade">宠物蛋品级 *</label>
                <select
                  id="egg-grade"
                  value={grade}
                  onChange={(event) => setGrade(event.target.value)}
                >
                  <option>A</option>
                  <option>S</option>
                  <option>SS</option>
                  <option>SSS</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title section-title-action">
              <div>
                <h3>已关联宠物</h3>
                <p>
                  用户孵化时从已关联宠物中随机获得；同一宠物允许被用户重复获得。
                </p>
              </div>
              <button className="btn primary" onClick={openPicker}>
                添加关联宠物
              </button>
            </div>
            <div className="bound-pet-list">
              {selectedPetItems.length ? (
                selectedPetItems.map((petItem) => (
                  <div className="bound-pet-row" key={petItem.id}>
                  <span className={`grade grade-${petItem.grade}`}>
                    {petItem.grade}
                  </span>
                  <span>
                    <strong>{petItem.name}</strong>
                    <small>
                      {petItem.id} · {petItem.cover}
                    </small>
                  </span>
                    <button
                      className="remove-btn"
                      onClick={() => removePet(petItem.id)}
                    >
                      移除
                    </button>
                  </div>
                ))
              ) : (
                <div className="bound-empty">
                  <strong>暂未关联宠物</strong>
                  <p>点击“添加关联宠物”，从全部宠物配置中选择绑定。</p>
                </div>
              )}
            </div>
            <p className="selected-summary">
              当前已关联 {selectedPetItems.length} 个宠物
            </p>
          </section>
          {error && <div className="form-error">{error}</div>}
        </div>
        <footer className="drawer-foot">
          <span>保存后关联宠物池变更将影响后续孵化结果</span>
          <div>
            <button className="btn" onClick={onClose}>
              取消
            </button>
            <button className="btn primary" onClick={save}>
              保存配置
            </button>
          </div>
        </footer>
      </aside>

      {pickerOpen && (
        <>
          <div className="picker-mask" onClick={() => setPickerOpen(false)} />
          <section
            className="picker-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="添加关联宠物"
          >
            <header className="picker-head">
              <div>
                <p className="eyebrow">PET CONFIGURATION</p>
                <h3>添加关联宠物</h3>
                <p>实时读取宠物配置列表，选择后绑定到当前宠物蛋。</p>
              </div>
              <button className="text-btn" onClick={() => setPickerOpen(false)}>
                关闭
              </button>
            </header>

            <div className="picker-toolbar">
              <div className="field">
                <label htmlFor="picker-keyword">关键词</label>
                <input
                  id="picker-keyword"
                  value={pickerKeyword}
                  onChange={(event) => setPickerKeyword(event.target.value)}
                  placeholder="搜索宠物名称 / ID / 资源文件"
                />
              </div>
              <div className="field">
                <label htmlFor="picker-grade">品级</label>
                <select
                  id="picker-grade"
                  value={pickerGrade}
                  onChange={(event) => setPickerGrade(event.target.value)}
                >
                  <option>全部</option>
                  <option>A</option>
                  <option>S</option>
                  <option>SS</option>
                  <option>SSS</option>
                </select>
              </div>
            </div>

            <div className="picker-source">
              <span>数据来源：宠物配置</span>
              <strong>共 {pets.length} 条</strong>
            </div>

            <div className="picker-table-wrap">
              {filteredPickerPets.length ? (
                <table className="picker-table">
                  <thead>
                    <tr>
                      <th className="picker-check-col">选择</th>
                      <th>宠物ID</th>
                      <th>宠物</th>
                      <th>品级</th>
                      <th>形态资源</th>
                      <th>更新时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPickerPets.map((petItem) => {
                      const alreadyBound = selectedPetIds.has(petItem.id);
                      return (
                        <tr key={petItem.id}>
                          <td>
                            {alreadyBound ? (
                              <span className="bound-label">已关联</span>
                            ) : (
                              <input
                                type="checkbox"
                                aria-label={`选择 ${petItem.name}`}
                                checked={pendingPetIds.has(petItem.id)}
                                onChange={() => togglePendingPet(petItem.id)}
                              />
                            )}
                          </td>
                          <td className="id-cell">{petItem.id}</td>
                          <td>
                            <strong>{petItem.name}</strong>
                            <small className="block muted">
                              {petItem.cover}
                            </small>
                          </td>
                          <td>
                            <span className={`grade grade-${petItem.grade}`}>
                              {petItem.grade}
                            </span>
                          </td>
                          <td>
                            <span
                              className={
                                petItem.resource === "6/6"
                                  ? "complete"
                                  : "incomplete"
                              }
                            >
                              {petItem.resource}
                            </span>
                          </td>
                          <td className="muted">{petItem.updated}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="picker-empty">
                  <strong>没有符合条件的宠物配置</strong>
                  <p>请调整关键词或品级筛选。</p>
                </div>
              )}
            </div>

            <footer className="picker-foot">
              <span>已选择 {pendingPetIds.size} 个待添加宠物</span>
              <div>
                <button className="btn" onClick={() => setPickerOpen(false)}>
                  取消
                </button>
                <button
                  className="btn primary"
                  disabled={!pendingPetIds.size}
                  onClick={bindPets}
                >
                  确认添加
                </button>
              </div>
            </footer>
          </section>
        </>
      )}
    </>
  );
}

export function App() {
  const [module, setModule] = useState("pet");
  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("全部");
  const [drawer, setDrawer] = useState(null);
  const [toast, setToast] = useState("");

  const activeRows = module === "pet" ? pets : eggs;
  const filteredRows = useMemo(
    () =>
      activeRows.filter((item) => {
        const text =
          module === "pet"
            ? `${item.id}${item.name}${item.cover}`
            : `${item.id}${item.cover}${item.pets}`;
        return (
          (!keyword || text.toLowerCase().includes(keyword.toLowerCase())) &&
          (grade === "全部" || item.grade === grade)
        );
      }),
    [activeRows, grade, keyword, module],
  );

  const notify = (message) => {
    setDrawer(null);
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const resetFilters = () => {
    setKeyword("");
    setGrade("全部");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>Pet Admin</span>
        </div>
        <p className="nav-title">宠物运营后台</p>
        <button
          className={`nav-item ${module === "pet" ? "active" : ""}`}
          onClick={() => {
            setModule("pet");
            resetFilters();
          }}
        >
          宠物配置
        </button>
        <button
          className={`nav-item ${module === "egg" ? "active" : ""}`}
          onClick={() => {
            setModule("egg");
            resetFilters();
          }}
        >
          宠物蛋配置
        </button>
        <div className="sidebar-foot">
          <span>生产环境</span>
          <strong>运营管理员</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{module === "pet" ? "宠物配置" : "宠物蛋配置"}</h1>
            <p>
              {module === "pet"
                ? "管理宠物基础信息、多语言名称、三星形态和外部展示资源。"
                : "管理宠物蛋封面、品级和关联宠物池。"}
            </p>
          </div>
          <div className="top-actions">
            <button
              className="btn primary"
              onClick={() =>
                setDrawer({
                  type: module,
                  mode: "create",
                  item: null,
                })
              }
            >
              {module === "pet" ? "新建宠物" : "新建宠物蛋"}
            </button>
          </div>
        </header>

        <div className="content">
          <section className="panel">
            <div className="panel-head">
              <div>
                <h2>{module === "pet" ? "宠物列表" : "宠物蛋列表"}</h2>
                <p>支持按关键词和品级快速定位配置。</p>
              </div>
              <span className="total">共 {filteredRows.length} 条</span>
            </div>

            <div className="filters">
              <div className="field search-field">
                <label htmlFor="keyword">关键词</label>
                <input
                  id="keyword"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder={
                    module === "pet"
                      ? "搜索宠物名称 / ID / 资源文件"
                      : "搜索宠物蛋ID / 资源文件 / 关联宠物"
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="grade-filter">品级</label>
                <select
                  id="grade-filter"
                  value={grade}
                  onChange={(event) => setGrade(event.target.value)}
                >
                  <option>全部</option>
                  <option>A</option>
                  <option>S</option>
                  <option>SS</option>
                  <option>SSS</option>
                </select>
              </div>
              <div className="filter-actions">
                <button className="btn" onClick={resetFilters}>
                  重置
                </button>
                <button className="btn primary">查询</button>
              </div>
            </div>

            {filteredRows.length ? (
              <div className="table-wrap">
                {module === "pet" ? (
                  <table className="pet-table">
                    <thead>
                      <tr>
                        <th>宠物ID</th>
                        <th>宠物</th>
                        <th>品级</th>
                        <th>三星形态资源</th>
                        <th>外部展示资源</th>
                        <th>更新时间</th>
                        <th className="action-col">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((item) => (
                        <tr key={item.id}>
                          <td className="id-cell">{item.id}</td>
                          <td>
                            <div className="object-cell">
                              <span className="file-thumb">WEBP</span>
                              <span>
                                <strong>{item.name}</strong>
                                <small>{item.cover}</small>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`grade grade-${item.grade}`}>
                              {item.grade}
                            </span>
                          </td>
                          <td>
                            <div className="completion">
                              <strong>{item.resource}</strong>
                              <span
                                className={
                                  item.resource === "6/6"
                                    ? "complete"
                                    : "incomplete"
                                }
                              >
                                {item.resource === "6/6" ? "完整" : "待补充"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="completion">
                              <strong>{item.external}</strong>
                              <span
                                className={
                                  item.external === "2/2"
                                    ? "complete"
                                    : "incomplete"
                                }
                              >
                                {item.external === "2/2" ? "完整" : "待补充"}
                              </span>
                            </div>
                          </td>
                          <td className="muted">{item.updated}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="link-btn"
                                onClick={() =>
                                  setDrawer({
                                    type: "pet",
                                    mode: "edit",
                                    item,
                                  })
                                }
                              >
                                编辑
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="egg-table">
                    <thead>
                      <tr>
                        <th>宠物蛋ID</th>
                        <th>宠物蛋封面</th>
                        <th>品级</th>
                        <th>关联宠物</th>
                        <th>更新时间</th>
                        <th className="action-col">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((item) => (
                        <tr key={item.id}>
                          <td className="id-cell">{item.id}</td>
                          <td>
                            <div className="object-cell">
                              <span className="file-thumb">WEBP</span>
                              <span>
                                <strong>{item.cover}</strong>
                                <small>宠物蛋封面资源</small>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`grade grade-${item.grade}`}>
                              {item.grade}
                            </span>
                          </td>
                          <td>
                            <strong>{item.petCount} 个</strong>
                            <small className="block muted">{item.pets}</small>
                          </td>
                          <td className="muted">{item.updated}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="link-btn"
                                onClick={() =>
                                  setDrawer({
                                    type: "egg",
                                    mode: "edit",
                                    item,
                                  })
                                }
                              >
                                编辑
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <strong>没有符合条件的配置</strong>
                <p>请调整筛选条件，或重置后查看全部数据。</p>
                <button className="btn" onClick={resetFilters}>
                  重置筛选
                </button>
              </div>
            )}

            <footer className="pagination">
              <span>第 1 页，共 1 页</span>
              <div>
                <button className="btn" disabled>
                  上一页
                </button>
                <button className="page-current">1</button>
                <button className="btn" disabled>
                  下一页
                </button>
              </div>
            </footer>
          </section>
        </div>
      </main>

      {drawer?.type === "pet" && (
        <PetDrawer
          mode={drawer.mode}
          pet={drawer.item}
          onClose={() => setDrawer(null)}
          onSaved={notify}
        />
      )}
      {drawer?.type === "egg" && (
        <EggDrawer
          mode={drawer.mode}
          egg={drawer.item}
          onClose={() => setDrawer(null)}
          onSaved={notify}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
